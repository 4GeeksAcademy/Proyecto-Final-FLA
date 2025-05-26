export const Footer = () => {

	return (
	<footer className="footer bg-success text-center text-white py-4">
		<div className="container">
			<div className="row">

				<div className="col-md-4">
					<h5>Sobre nosotros</h5>
					<p>Descripción muy breve de la empresa.</p>
				</div>

				<div className="col-md-4">
					<h5>Contacto</h5>
					<p>Teléfono: +34 123 456 789</p>
					<p>&copy; 2025 Proyecto 
						FLA
					</p>
				</div>

				<div className="col-md-4">
					<h5>Síguenos</h5>
					<a href="https://www.facebook.com/" className="text-black me-2" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-facebook-f"></i>
					</a>
					<a href="https://twitter.com/" className="text-black me-2" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="https://www.instagram.com/" className="text-black me-2" target="_blank" rel="noopener noreferrer">
						<i className="fab fa-instagram"></i>
					</a>
				</div>
			</div>
		</div>



	</footer>
);}
