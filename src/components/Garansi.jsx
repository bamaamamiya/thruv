import SvgBackgroundDiv from "./SvgBackgroundDiv"


const Garansi = () => {
    return (
        <div>
            <SvgBackgroundDiv/>
            <div className="bg-yellto">
                <div className="flex justify-center items-center">
                    <img
                        src="https://brdsg.com/img/300/bq7l6jnnbq9dv94oih_1/heOFIoEAC2udCvyheObpFNHgZHh41KT4e6FRpjdYj5EQ.png"
                        alt="garansi"
                        className="w-32 h-32"
                        />
                </div>

                <div>
                    <h1 className="text-redto font-extrabold text-2xl text-center">GARANSI RETURN/UANG KEMBALI</h1>
                    <p className="text-black font-extrabold text-xl text-center">Jika produk tidak berfungsi/cacat</p>
                </div>

            </div>
            <SvgBackgroundDiv/>
        </div>
    )
}

export default Garansi 