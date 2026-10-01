"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { LocaleText, useTranslation } from "@/components/LocaleProvider";
import type { TranslationKey } from "@/content/i18n/translations";
import type { Episode } from "@/lib/content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function SkipIcon({ forward }: { forward: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M5 6v12l9-6-9-6Zm9 0v12l9-6-9-6Z" fill="currentColor" transform={forward ? undefined : "translate(28 0) scale(-1 1)"} />
      <path d="M12 4v4m0-4 3 2m-3-2L9 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function PodcastPlayer({ episode }: { episode: Episode }) {
  const t = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(episode.duration);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackError, setPlaybackError] = useState<TranslationKey | null>(null);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setPlaybackError(null);
      void audio.play().catch(() => {
        setPlaybackError("player.playError");
      });
    } else {
      audio.pause();
    }
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration || 0);
    }
  }

  function changeRate(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  }

  function restorePosition() {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(Number.isFinite(audio.duration) ? audio.duration : episode.duration);
    const savedPosition = Number(localStorage.getItem(`gitcast:episode:${episode.id}:position`));
    if (savedPosition > 0 && savedPosition < audio.duration) {
      audio.currentTime = savedPosition;
      setCurrentTime(savedPosition);
    }
  }

  function savePosition() {
    localStorage.setItem(
      `gitcast:episode:${episode.id}:position`,
      String(audioRef.current?.currentTime ?? currentTime),
    );
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={restorePosition}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false);
          savePosition();
        }}
        onEnded={() => {
          setIsPlaying(false);
          localStorage.removeItem(`gitcast:episode:${episode.id}:position`);
        }}
        onError={() => setPlaybackError("player.unavailableError")}
      >
        <source src={episode.audio} type="audio/mpeg" />
        <LocaleText id="player.audioUnsupported" />
      </audio>

      <div className="audio-player-heading">
        <div>
          <p className="eyebrow text-foreground-subtle"><LocaleText id="player.nowPlaying" /></p>
          <p lang="fa" dir="rtl" className="mt-2 line-clamp-1 text-sm text-foreground">{episode.title}</p>
        </div>
        <label className="playback-rate">
          <span className="sr-only"><LocaleText id="player.speed" /></span>
          <select
            value={playbackRate}
            onChange={(event) => changeRate(Number(event.target.value))}
            aria-label={t("player.speed")}
          >
            {[1, 1.25, 1.5, 2].map((rate) => (
              <option key={rate} value={rate}>{rate}×</option>
            ))}
          </select>
        </label>
      </div>

      <div className="audio-progress">
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label={t("player.position")}
          dir="ltr"
          style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties}
        />
        <div className="audio-time" dir="ltr">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="audio-controls">
        <button type="button" className="skip-control" onClick={() => skip(15)} aria-label={t("player.forward")}>
          <SkipIcon forward />
          <span>{t("player.skip.amount")}</span>
        </button>
        <button
          type="button"
          className="main-play-control"
          onClick={togglePlayback}
          aria-label={isPlaying ? t("player.pause") : t("player.start")}
        >
          {isPlaying ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M7.5 4.9c0-.8.9-1.3 1.6-.9l11 6.6a1.6 1.6 0 0 1 0 2.8l-11 6.6c-.7.4-1.6-.1-1.6-.9V4.9Z" />
            </svg>
          )}
        </button>
        <button type="button" className="skip-control" onClick={() => skip(-15)} aria-label={t("player.back")}>
          <SkipIcon forward={false} />
          <span>{t("player.skip.amount")}</span>
        </button>
      </div>
      {playbackError && (
        <p role="status" className="mt-4 text-center text-xs text-red-300">
          {t(playbackError)}
        </p>
      )}
    </div>
  );
}
