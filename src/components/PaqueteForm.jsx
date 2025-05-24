import React, { useState, useRef, useEffect } from "react";
import { Messages } from 'primereact/messages';
import { useDecryptToken } from "../App";

const PaqueteForm = () => {
	const msgs = useRef(null);
	const [nombre, setNombre] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [link, setLink] = useState("");
	const [precio, setPrecio] = useState(0);
	const [cursos, setCursos] = useState([]);
	const [cursoSeleccionado, setCursoSeleccionado] = useState("");
	const [cursosDisponibles, setCursosDisponibles] = useState([]);

	const handleAddCurso = () => {
		if (cursoSeleccionado && !cursos.includes(cursoSeleccionado)) {
			setCursos([...cursos, cursoSeleccionado]);
			setCursoSeleccionado("");
		}
	};

	const handleRemoveCurso = (index) => {
		setCursos(cursos.filter((_, i) => i !== index));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
			if (!nombre || !descripcion || !link || precio <= 0 || cursos.length === 0) {
					msgs.current.clear();
					msgs.current.show([
						{ sticky: true, severity: 'error', summary: 'Error', detail: 'Rellene todos los campos' },
					]);
					return;
				}
		
			try{
				const token = useDecryptToken(localStorage.getItem('authToken'));
				const API_URL = import.meta.env.VITE_API_URL;
				const body = {
					nombre: nombre,
					descripcion: descripcion,
					videoPresentacion: link,
					precio: precio,
					cursos: cursos
				}
				fetch(`${API_URL}/api/paquetes`, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body)
				}).then(res => res.json())
				.then(data => {
					if (data.id) {
						msgs.current.clear();
						msgs.current.show([
						{ sticky: true, severity: 'success', summary: 'Éxito', detail: 'Curso creado exitosamente' },
						]);
						setNombre("");
						setDescripcion("");
						setLink("");
						setCursos([]);
						setPrecio(0);
					}else{
						msgs.current.clear();
						msgs.current.show([
						{ sticky: true, severity: 'error', summary: 'Error', detail: 'Error al crear el curso' },
						]);
					}
				})
			}catch(error){
				console.log(error);
			}
	};

	useEffect(() => {
		const fetchCursos = async () => {
			try {
				const token = useDecryptToken(localStorage.getItem('authToken'));
				const API_URL = import.meta.env.VITE_API_URL;
				const response = await fetch(`${API_URL}/api/curso`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
				});
				const res = await response.json();
				const data = res.map((curso) => curso.nombre);
				setCursosDisponibles(data);
			} catch (error) {
				console.error("Error fetching cursos:", error);
			}
		};

		fetchCursos();
	}, []);

	return (
		<div className="paquete-form-container">
			<div  style={{position: 'fixed', top: '2rem', zIndex: 1000, textAlign: 'center', width: '100%'}}>
				<Messages ref={msgs} style={{width: '70%'}}/>
			</div>
		<form className="paquete-form" onSubmit={handleSubmit}>
			<h2 className="paquete-form-title">
			<span className="paquete-form-title-main">NUEVO PAQUETE</span>
			</h2>
			<label className="paquete-form-label">Nombre</label>
			<input
			className="paquete-form-input"
			type="text"
			value={nombre}
			onChange={(e) => setNombre(e.target.value)}
			required
			/>
			<label className="paquete-form-label">Descripción</label>
			<textarea
			className="paquete-form-textarea"
			value={descripcion}
			onChange={(e) => setDescripcion(e.target.value)}
			required
			/>
			<label className="paquete-form-label">Cursos</label>
			<div className="paquete-form-cursos-select-row">
			<select
				className="paquete-form-select"
				value={cursoSeleccionado}
				onChange={(e) => setCursoSeleccionado(e.target.value)}
			>
				<option value="">Selecciona un curso</option>
				{cursosDisponibles.map((curso, idx) => (
				<option key={idx} value={curso}>{curso}</option>
				))}
			</select>
			<button
				type="button"
				className="paquete-form-add-btn"
				onClick={handleAddCurso}
				title="Añadir"
			>
				<span>+</span>
			</button>
			</div>
			<div className="paquete-form-cursos-list">
			{cursos.map((curso, idx) => (
				<div className="paquete-form-curso-item" key={idx}>
				<span>{curso}</span>
				<button
					type="button"
					className="paquete-form-remove-btn"
					onClick={() => handleRemoveCurso(idx)}
					title="Eliminar"
				>
					<span>−</span>
				</button>
				</div>
			))}
			</div>
			<label className="paquete-form-label">Link presentación</label>
			<input
				className="paquete-form-input"
				type="url"
				placeholder="https://www.youtube.com/watch?"
				value={link}
				onChange={(e) => setLink(e.target.value)}
			/>
			<label className="paquete-form-label">Precio</label>
			<input
				className="paquete-form-input"
				type="number"
				value={precio}
				onChange={(e) => setPrecio(e.target.value)}
			/>
			<button className="paquete-form-submit" type="submit">
			Crear Paquete
			</button>
		</form>
		</div>
	);
};

export default PaqueteForm;
