class Usuario{
    constructor(nombre, apellido, mascotas, libros ){
        this.nombre = nombre,
        this.apellido = apellido,
        this.mascotas = mascotas,
        this.libros = libros

    }

    getFullNaeme(){
        console.log(`Mi nombre completo es ${this.nombre} ${this.apellido}`  )
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(libro, nombre){
        this.libros.push({titulo: libro ,autor: nombre});
    }

    getBooks(){
        return this.libros.find(title => {
            console.log(title.titulo)    
        });
    }

    


}

const usuario1 = new Usuario('Ivan', 'Otta', ['Perro', 'Gato'], [{ titulo: 'Viaje al fin de la noche', autor: 'Louis-Ferdinand Céline' }, {titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes'}]  )





usuario1.getFullNaeme()

usuario1.addMascota('Hamster')

console.log(usuario1.countMascotas())

usuario1.addBook('Spiderman', 'Stan Lee')

usuario1.getBooks()

console.log(usuario1)


