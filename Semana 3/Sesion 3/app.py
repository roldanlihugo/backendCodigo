from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def inicio():
    resultado = [{
        'id':1,
        'nombre':'Eduardo',
        'edad':28,
        'hobbies':['NADAR','MONTAR BICI', 'PROGRAMAR']
    },{
        'id':2,
        'nombre':'Roxana',
        'edad':23,
        'hobbies':['PROGRAMAR','FUTBOL', 'EQUITACION']
    }]
    return render_template('index.html',clientes=resultado)

@app.route('/acerca-de')
def acerca_de():
    return render_template('acerca_de.html')

@app.route('/contactame')
def contact():
    return render_template('contactame.html')
if __name__ == '__main__':
    app.run(debug=True)