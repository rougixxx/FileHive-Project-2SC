import pickle
import tensorflow as tf
from mlmodels.pdf_model.pdf_extract import extract_pdf_features
from keras.models import load_model

pdf_classifier = pickle.load(open('/app/mlmodels/pdf_model/pdf_classifier.sav', 'rb'))
malware_classifier = tf.keras.models.load_model("/app/mlmodels/malware_model/png_malware_detection.h5")
# malware_classifier = load_model("/app/mlmodels/malware_model/png_malware_detection.h5")
from mlmodels.malware_model.malware_extract import convert_exe_to_image, preprocess_image, predict_image
def map_model_to_file(type, file_bytes):
    if type == 'pdf':
        features = extract_pdf_features(file_bytes)
        prediction = pdf_classifier.predict(features)
        return prediction[0]
    if type == "exe":
        image = convert_exe_to_image(file_bytes)
        prediction = predict_image(malware_classifier, image)
        return prediction