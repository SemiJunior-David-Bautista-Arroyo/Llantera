#main.py
from app import create_app
from productos import prod
from proveedores import prove
from clientes import client
from usuarios import user
from marcas import marc
from flask_cors import CORS

app = create_app()
app.register_blueprint(prod)
app.register_blueprint(prove)
app.register_blueprint(client)
app.register_blueprint(user)
app.register_blueprint(marc)
CORS(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)