from flask import Flask, request, jsonify
import whisper
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # 모든 출처에서의 요청을 허용합니다.
model = whisper.load_model('tiny')  # 모델을 로드합니다.

@app.route('/transcribe', methods=['POST'])
def handle_transcribe():
    try:
        print("요청 받았습니다.")
        # 파일 업로드 받기
        audio_file = request.files['file']
        audio_path = "temp.wav"
        
        # 파일 저장
        audio_file.save(audio_path)
        print(f"저장경로: {audio_path}")
        result = model.transcribe(audio_path)

        
        # 결과 반환
        print(f"결과: {result['text']}")
        return jsonify({"text": result['text']})

    except Exception as e:
        print(f"파일 처리 중 오류 발생: {e}")
        return jsonify({"error": "음성 변환 실패"}), 500

if __name__ == '__main__':
    app.run()
