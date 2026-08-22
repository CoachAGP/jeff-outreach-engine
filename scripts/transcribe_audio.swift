import Foundation
import Speech

guard CommandLine.arguments.count >= 2 else {
    fputs("usage: transcribe_audio.swift <audio-file>\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let locale = Locale(identifier: "en-US")
guard let recognizer = SFSpeechRecognizer(locale: locale) else {
    fputs("speech recognizer unavailable\n", stderr)
    exit(3)
}
fputs("recognizer available=\(recognizer.isAvailable) onDevice=\(recognizer.supportsOnDeviceRecognition)\n", stderr)

let authSemaphore = DispatchSemaphore(value: 0)
var authStatus: SFSpeechRecognizerAuthorizationStatus = .notDetermined
SFSpeechRecognizer.requestAuthorization { status in
    authStatus = status
    authSemaphore.signal()
}
_ = authSemaphore.wait(timeout: .now() + 20)
guard authStatus == .authorized else {
    fputs("speech authorization status: \(authStatus.rawValue)\n", stderr)
    exit(4)
}
fputs("speech authorization granted\n", stderr)

let request = SFSpeechURLRecognitionRequest(url: inputURL)
request.shouldReportPartialResults = true
request.requiresOnDeviceRecognition = recognizer.supportsOnDeviceRecognition
request.addsPunctuation = true

let done = DispatchSemaphore(value: 0)
var finalText = ""
var taskError: Error?
let task = recognizer.recognitionTask(with: request) { result, error in
    if let result = result {
        finalText = result.bestTranscription.formattedString
        fputs("partial characters=\(finalText.count) final=\(result.isFinal)\n", stderr)
        if result.isFinal { done.signal() }
    }
    if let error = error {
        taskError = error
        done.signal()
    }
}

if done.wait(timeout: .now() + 180) == .timedOut {
    task.cancel()
    fputs("speech recognition timed out\n", stderr)
    exit(5)
}
if let error = taskError, finalText.isEmpty {
    fputs("speech recognition failed: \(error.localizedDescription)\n", stderr)
    exit(6)
}
fputs("transcription complete characters=\(finalText.count)\n", stderr)
print(finalText)
