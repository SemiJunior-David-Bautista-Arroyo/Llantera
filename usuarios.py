from app import create_app
from mongo import mongo
from flask import Blueprint, jsonify, request
from bson.json_util import dumps
from bson.objectid import ObjectId

user = Blueprint("user",__name__)

@user.route('/usuarios/login/<string:email>/<string:password>', methods=['GET'])
def login(email,password):
    query = {'email': {'$eq': email},'password': {'$eq':password}}
    project = {"_id":0,"email":1,"password":1}
    try:
        resultado = list(mongo.db.usuarios.find(query, project))
        if resultado:

            return jsonify(resultado)
        else: 
            return jsonify({"mensaje": "Usuario no encontrado"}),404
        
    except Exception as e:
        return jsonify({"error ": str(e)}),500    
    
    

@user.route('/usuarios/get_all')
def listar_user():
    data = mongo.db.usuarios.find({})
    r = dumps(data)
    return r

@user.route("/usuarios/nuevoUser", methods=['POST'])
def add_user():
    nombre = request.json["nombre"]
    email = request.json["email"]
    password = request.json["password"]
    productos = request.json["productos"]
    
    if request.method == 'POST':
        usr={"nombre" : nombre,
            "email" : email,
            "password": password,
            "producto": productos
        }

    try:
        resultado = mongo.db.usuarios.insert_one(usr)
        if resultado:
            return jsonify({"Mensaje": "Documento Insertado"})
        else:
            return jsonify({"Mensaje": "Documento no insertado"}),404
    
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
    
@user.route('/usuarios/eliminar/<string:id>',methods=['DELETE'])
def eliminar(id):
    try:
        resultado = mongo.db.usuarios.delete_one({'id': ObjectId(id)})
        if resultado:
            return jsonify(({"mensaje": "Documento eliminado"}))
        
        else:
            return jsonify({"mensaje": "Documento no encontrado"})
    
    except Exception as e:
        return jsonify({'error': str(e)}),500
     

@user.route('/usuarios/actualizar/<string:id>',methods=['PUT'])
def actualizar_costo(id):
    nueva_password=request.json['password']
    try:
        resultado = mongo.db.usuarios.update_one({"_id":ObjectId(id)} , {"$set" :{"password": nueva_password}})
        if resultado:
            return jsonify({"mensaje": "Password Actualizado"})
        else:
            return jsonify({"mensaje" : "Documento no Actualizado"})
        
    except Exception as e:
        return jsonify({"error": str(e)}),500