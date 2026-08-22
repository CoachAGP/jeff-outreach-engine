import argparse
import json
import os
from pathlib import Path

import imageio_ffmpeg
import mlx_whisper


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("audio")
    parser.add_argument("--out", required=True)
    parser.add_argument("--model", default="mlx-community/whisper-small-mlx")
    args = parser.parse_args()

    audio_path = Path(args.audio).resolve()
    output_base = Path(args.out)
    output_base.parent.mkdir(parents=True, exist_ok=True)

    ffmpeg_path = Path(imageio_ffmpeg.get_ffmpeg_exe()).resolve()
    bin_dir = output_base.parent / "ffmpeg-bin"
    bin_dir.mkdir(parents=True, exist_ok=True)
    ffmpeg_link = bin_dir / "ffmpeg"
    if not ffmpeg_link.exists():
        ffmpeg_link.symlink_to(ffmpeg_path)
    os.environ["PATH"] = f"{bin_dir}:{os.environ.get('PATH', '')}"

    result = mlx_whisper.transcribe(
        str(audio_path),
        path_or_hf_repo=args.model,
        language="en",
        word_timestamps=True,
        verbose=False,
    )

    output_base.with_suffix(".json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    transcript_lines = []
    for segment in result.get("segments", []):
        start = float(segment.get("start", 0))
        minutes = int(start // 60)
        seconds = int(start % 60)
        text = segment.get("text", "").strip()
        transcript_lines.append(f"[{minutes:02d}:{seconds:02d}] {text}")
    output_base.with_suffix(".txt").write_text(
        "\n".join(transcript_lines) + "\n", encoding="utf-8"
    )
    print(output_base.with_suffix(".txt").resolve())


if __name__ == "__main__":
    main()
