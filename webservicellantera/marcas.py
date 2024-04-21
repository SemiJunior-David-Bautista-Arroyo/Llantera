from app import create_app
from mongo import mongo
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId



marc = Blueprint("marc", __name__)
CORS(marc)

#Obtener todas las marcas
#------------------------------------------------#
@marc.route('/marcas/get_all', methods=['GET'])
def listar_marcas():
    data = mongo.db.marcas.find({})
    r = []
    for producto in data:
        producto['_id'] = str(producto['_id'])
        r.append(producto)
    return r
#------------------------------------------------#

#Obtener marcas por _Id
#-----------------------------------------------------------------------#
@marc.route('/marcas/porID/<string:id>', methods=['GET'])
def listar_marc_id(id):
    query = {'_id':ObjectId(id)}
    proyect = {"_id": 0, "marca":1, "sitio_web": 1, "anio_fundacion": 1}
    try:
        result = mongo.db.marcas.find_one(query, proyect)
        if result:
            return jsonify(result)
        else:
            return jsonify({"mensaje": "Documento no encontrado"}), 404 
    except Exception as e:
        return jsonify({"error": str(e)}), 500
#-----------------------------------------------------------------------#
    #ACTUALIZAR MARCA

@marc.route('/marcas/actualizar/<string:id>',methods=['PUT'])
def actualizar_costo(id):
    nuevo_marca=request.json['marca']
    nuevo_sitio_web = request.json['sitio_web']
    nuevo_anio_fundacion = request.json['anio_fundacion']
    try:
        resultado = mongo.db.marcas.update_one({"_id":ObjectId(id)} , {"$set" :{"marca": nuevo_marca,
                                                                                   "sitio_web": nuevo_sitio_web,
                                                                                   "anio_fundacion": nuevo_anio_fundacion}})
        if resultado:
            return jsonify({"mensaje": "Documento Actualizado"})
        else:
            return jsonify({"mensaje": "Documneto no eonctrado"}),404
    
    except Exception as e:
        return jsonify({"error": str(e)}),500    
#-----------------------------------------------------------------------#
 #ELIMINAR MARCA
@marc.route('/marcas/eliminar/<string:id>',methods=['DELETE'])
def eliminar(id):
    try:
        resultado = mongo.db.marcas.delete_one({'_id': ObjectId(id)})
        if resultado:
            return jsonify(({"mensaje": "Documento eliminado"}))
        
        else:
            return jsonify({"mensaje": "Documento no encontrado"})
    
    except Exception as e:
        return jsonify({'error': str(e)}),500     

#Agregar una nueva marca
#-----------------------------------------------------------------------#    
@marc.route('/marcas/nuevaMarca', methods=['POST'])
def agregar_marca():
    try:
        data = request.json

        marca = data.get("marca")
        marcaid = data.get("marcaId")
        imagen = data.get("imagen")
        sitio_web = data.get("sitio_web")
        anio_fundacion = data.get("anio_fundacion")

        nueva_marca = {
            "marca": marca,
            "marcaId": marcaid,
            "imagen": imagen,
            "sitio_web": sitio_web,
            "anio_fundacion": anio_fundacion
        }

        resultado = mongo.db.marcas.insert_one(nueva_marca)

        if resultado:
            return jsonify({"mensaje": "Marca agregada con exito"})
        else:
            return jsonify({"mensaje": "No se pudo agregar la marca"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500