import sys
import face_recognition

def recognize(img1_path, img2_path):
    img1 = face_recognition.load_image_file(img1_path)
    img2 = face_recognition.load_image_file(img2_path)
    # Get face encodings for img1
    encodings_img1 = face_recognition.face_encodings(img1)
    if len(encodings_img1) == 0:
        return False

    # Get face encodings for img2
    encodings_img2 = face_recognition.face_encodings(img2)
    if len(encodings_img2) == 0:
        return False

    # Compare
    match = face_recognition.compare_faces([encodings_img1[0]], encodings_img2[0])[0]

    return match


img1_path = './1.jpg'
img2_path = './2.jpg'

is_match = recognize(img1_path, img2_path)

print(is_match)
