
let pagina = 1
const btnanterior= document.getElementById('btnanterior')
const btnsiguiente= document.getElementById('btnsiguiente')

btnsiguiente.addEventListener('click',()=>{
	if(pagina<1000){
		pagina+=1;
	 cargarpeli();

	}
	
})
btnanterior.addEventListener('click',()=>{
	if(pagina>=1){
	 pagina-=1;
	 cargarpeli();
	
	}
})
const cargarpeli=async()=>{
	try{
	// const respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`)
	const respuesta = await axios.get('https://api.themoviedb.org/3/movie/popular',{
		params:{
			api_key:'192e0b9821564f26f52949758ea3c473',
			language:'es-MX',
			page:pagina
		},
		header:{
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJlMGI5ODIxNTY0ZjI2ZjUyOTQ5NzU4ZWEzYzQ3MyIsInN1YiI6IjYxODQyMWZlOGVkMDNmMDAyZDA4ZjZlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nrCdKCx2dZQ7d0WaJpXJaPO_De2iP2rYg9bPon1O3V0'
		}
	})

	console.log(respuesta);
	if(respuesta.status===200){
		
		let peliculas='';

		respuesta.data.results.forEach(pelicula=>{
			peliculas += `
			<div class="pelicula">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
			</div>
			<p>${pelicula.title} </p>
			
			`
		});

		document.getElementById('contenedor').innerHTML=peliculas

	}else if(respuesta.status=== 401){
		console.log('paso hp puso mal la clave')
		
	}else if(respuesta.status=== 404){
		console.log('no invente peliculas sapo')
		
	}else {
		console.log('me daño la pagina mk')
		
	}
	
}catch(error){
	console.log(error)
	
}
}
cargarpeli();