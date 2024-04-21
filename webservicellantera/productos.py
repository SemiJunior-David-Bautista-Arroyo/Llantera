from app import create_app
from mongo import mongo
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId
from datetime import datetime

prod = Blueprint("products", __name__)


@prod.route('/productos/get_all', methods=['GET'])
def get_productos():
    data = mongo.db.productos.find({})
    r = []
    for producto in data:
        producto['_id'] = str(producto['_id'])
        r.append(producto)
    return r

@prod.route('/productos/porNombre/<string:cve>', methods=['GET'])
def obtener_PorNombre(cve):
    query =  {'cve': {'$eq': cve}}
    sort = [("cve",1)]
    project = {"_id":0,"cve":1,"fecha_f":1,"fecha_ad":1, "fecha_cr":1,"modelo":1}
    try:
        resultado = list(mongo.db.productos.find(query, project).sort(sort))
        if resultado:

            return jsonify(resultado)
        else: 
            return jsonify({"mensaje": "Documento no encontrado"}),404
        
    except Exception as e:
        return jsonify({"error ": str(e)}),500
    
@prod.route('/productos/porID/<string:id>',methods=['GET'])
def obtener_PorId(id):
    query = {'_id': ObjectId(id)}
    project = {'_id':0,"cve" :1, "costo":1, "descripcion":1}
    try:
        resultado = list(mongo.db.productos.find(query, project))
        if resultado:

            return jsonify(resultado)
        else: 
            return jsonify({"mensaje": "Documento no encontrado"}),404
        
    except Exception as e:
        return jsonify({"error ": str(e)}),500
    
@prod.route('/productos/prod_prov', methods=['GET'])
def obtener_prod_prov():
    query = [
                {
                '$lookup':{
                    'from':"proveedor",
                    'localField':"prooveedor_id",
                    'foreignField':"id",
                    'as': "proveedor"
                    }
                    },
                    {
                    '$unwind':"$proveedor"
                    },
                    {
                    '$project':{
                    "_id":0,
                    "cve":1,
                    "marca":1,
                    "precio":1,
                    "prooveedor_id": 1,
                    "proveedor.id":1,
	                "proveedor.nombre_proveedor":1,
                    "proveedor.telefono":1,
                    "proveedor.Locacion":1,
                    }
                    }
                ]
    try:
        resultado = mongo.db.productos.aggregate(query)
        if resultado:
            return list(resultado)
        else:
            return jsonify({'mensaje': "Documento no encontrado"}),404
    except Exception as e:
        return jsonify({"error": str(e)}),500


@prod.route("/productos/nuevoProd", methods=['POST'])
def add_producto():
    cve = request.json["cve"]
    ancho = request.json["medida"]["ancho"]
    serie = request.json["medida"]["serie"]
    rin = request.json["medida"]["rin"]
    marca = request.json["marca"]
    presionmax = request.json["presionmax"]
    carga = request.json["indices"]["carga"]
    velocidad = request.json["indices"]["velocidad"]
    tipo = request.json["tipo"]
    altura = request.json["altura"]
    diametro_inf = request.json["diametro_inf"]
    modelo = request.json["modelo"]
    resistencia = request.json["resistencia"]
    fecha_f = request.json["fecha_f"]
    costo = request.json["costo"]
    precio = request.json["precio"]
    descripcion = request.json["descripcion"]
    origen = request.json["origen"]
    status = request.json["status"]
    existencia = request.json["existencia"]
    fecha_ad = request.json["fecha_ad"]
    foto = request.json["foto"]
    temporada = request.json["temporada"]
    prooveedor_id = request.json["prooveedor_id"]
    
    fecha_fab = datetime.strptime(fecha_f, "%Y-%m-%d")
    fecha_adq = datetime.strptime(fecha_ad, "%Y-%m-%d")
    
    if request.method == 'POST':
        product={"cve": cve,
        "medida": {
        "ancho": ancho,
        "serie": serie,
        "rin": rin
        },
        "marca": marca,
        "presionmax": presionmax,
        "indices": {
        "carga": carga,
        "velocidad": velocidad
        },
        "tipo": tipo,
        "altura": altura,
        "diametro_inf": diametro_inf,
        "modelo": modelo,
        "resistencia": resistencia,
        "fecha_f": fecha_fab,
        "costo": costo,
        "precio": precio,
        "descripcion": descripcion,
        "origen": origen,
        "status": status,
        "existencia": existencia,
        "fecha_ad":fecha_adq,
        "fecha_cr": datetime.now(),
        "foto": foto,
        "temporada": temporada,
        "prooveedor_id": prooveedor_id}
        
        
    try:
        resultado = mongo.db.productos.insert_one(product)
        if resultado:
            return jsonify({"Mensaje": "Documento Insertado"})
        else:
            return jsonify({"mensja": "Documento no insertado"}),404
    
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
    
@prod.route('/productos/eliminar/<string:id>',methods=['DELETE'])
def eliminar(id):
    try:
        resultado = mongo.db.productos.delete_one({'_id': ObjectId(id)})
        if resultado:
            return jsonify(({"mensaje": "Documento eliminado"}))
        
        else:
            return jsonify({"mensaje": "Documento no encontrado"})
    
    except Exception as e:
        return jsonify({'error': str(e)}),500

@prod.route('/productos/actualizar/<string:id>',methods=['PUT'])
def actualizar_costo(id):
    nuevo_costo=request.json['costo']
    nuevo_cve = request.json['cve']
    nuevo_desc = request.json['descripcion']
    try:
        resultado = mongo.db.productos.update_one({"_id":ObjectId(id)} , {"$set" :{"costo": nuevo_costo,
                                                                                   "cve": nuevo_cve,
                                                                                   "descripcion": nuevo_desc}})
        if resultado:
            actualizar_precio(id, nuevo_costo)
            return jsonify({"mensaje": "Documento Actualizado"})
        else:
            return jsonify({"mensaje": "Documneto no eonctrado"}),404
    
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
def actualizar_precio(id, nuevo_costo):
    try:
        resultado = mongo.db.productos.update_one({"_id":ObjectId(id)}, {'$set':{"precio": nuevo_costo + (nuevo_costo*20/100)}})
        if resultado:
            return jsonify({"mensaje": "precio Actualizado"})
        else:
            return jsonify({"mensaje" : "Documento no econtrado"})
        
    except Exception as e:
        return jsonify({"error": str(e)}),500        