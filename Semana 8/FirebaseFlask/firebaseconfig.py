import firebase_admin
from firebase_admin import credentials, db, storage
# vinculo mis credenciales con mi archivo json
credenciales = credentials.Certificate("credenciales.json")
# inicializo mi aplicacion con las credenciales proveidas
firebase_admin.initialize_app(credenciales, 
    {
        "databaseURL":"https://backend-flask-eduardo-default-rtdb.firebaseio.com/",
        "storageBucket":"backend-flask-eduardo.appspot.com"
    })
firebase_categoria = db.reference("/categoria")
firebase_producto = db.reference("/producto")
firebaseAlmacenamiento = storage.bucket()
