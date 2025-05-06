import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Floting = () => {
	const handleClick = () => {
		const el = document.getElementById('formulir');
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="sticky bottom-0 w-full p-2 z-50">
			<div className="bg-redto text-white rounded-lg">
				<button
					onClick={handleClick}
					className="space-x-2 font-bold p-2 flex justify-center items-center w-full"
					aria-label="Ambil Promo"
				>
					<FontAwesomeIcon icon={faCartShopping} />
					<span>AMBIL PROMO ( BISA COD )</span>
				</button>
			</div>
		</div>
	);
};

export default Floting;
