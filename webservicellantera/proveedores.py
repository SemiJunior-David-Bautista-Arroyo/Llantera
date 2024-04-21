from app import create_app
from mongo import mongo
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId
from datetime import datetime


prove = Blueprint("provee", __name__)


@prove.route('/proveedores/get_all')
def listar_prove():
    data = mongo.db.proveedor.find({})
    r = []
    for prov in data:
        prov['_id'] = str(prov['_id'])
        r.append(prov)
    return r


@prove.route('/proveedores/porNombre/<string:nombre>', methods=['GET'])
def obtener_PorNombre(nombre):
    query =  {'nombre_proveedor': {'$eq':nombre }}
    sort = [("id",1)]
    project = {"_id":0,"id":1,"nombre_proveedor":1,"telefono":1,"Locacion":1}
    try:
        resultado = list(mongo.db.proveedor.find(query, project).sort(sort))
        if resultado:

            return jsonify(resultado)
        else: 
            return jsonify({"mensaje": "Documento no encontrado"}),404
        
    except Exception as e:
        return jsonify({"error ": str(e)}),500
    
    

@prove.route("/proveedores/nuevoProv", methods=['POST'])
def add_prove():
    id = request.json["id"]
    nombre_pro = request.json["nombre_proveedor"]
    telefono = request.json["telefono"]
    loc = request.json["Locacion"]["ciudad"]

    
    if request.method == 'POST':
        prov={"id" : id,
            "nombre_proveedor": nombre_pro,
            "telefono" : telefono,
            "Locacion": {
                "ciudad": loc}}

    try:
        resultado = mongo.db.proveedor.insert_one(prov)
        if resultado:
            return jsonify({"Mensaje": "Documento Insertado"})
        else:
            return jsonify({"Mensaje": "Documento no insertado"}),404
    
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
    
@prove.route('/proveedores/eliminar/<string:id>',methods=['DELETE'])
def eliminar(id):
    try:
        resultado = mongo.db.proveedor.delete_one({'_id': ObjectId(id)})
        if resultado:
            return jsonify(({"mensaje": "Documento eliminado"}))
        
        else:
            return jsonify({"mensaje": "Documento no encontrado"})
    
    except Exception as e:
        return jsonify({'error': str(e)}),500
     

@prove.route('/proveedores/actualizar/<string:id>',methods=['PUT'])
def actualizar_costo(id):
    nuevo_nombre = request.json['nombre_proveedor']
    nuevo_tel=request.json['telefono']
    nuevo_locacion = request.json["Locacion"]["ciudad"]
    try:
        resultado = mongo.db.proveedor.update_one({"_id":ObjectId(id)} , {"$set" :{
                                                                                    "nombre_proveedor": nuevo_nombre,
                                                                                    "telefono": nuevo_tel,                                                                       
                                                                                   "Locacion.ciudad": nuevo_locacion}})
        if resultado:
            return jsonify({"mensaje": "telefono Actualizado"})
        else:
            return jsonify({"mensaje" : "Documento no econtrado"})
        
    except Exception as e:
        return jsonify({"error": str(e)}),500  
    
@prove.route('/proveedores/porID/<string:id>',methods=['GET'])
def obtener_PorId(id):
    query = {'_id': ObjectId(id)}
    project = {"_id":0,"nombre_proveedor":1,"telefono":1,"Locacion.ciudad":1}
    try:
        resultado = list(mongo.db.proveedor.find(query, project))
        if resultado:

            return jsonify(resultado)
        else: 
            return jsonify({"mensaje": "Documento no encontrado"}),404
        
    except Exception as e:
        return jsonify({"error ": str(e)}),500