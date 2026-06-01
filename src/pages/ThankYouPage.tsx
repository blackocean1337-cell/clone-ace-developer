import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const ThankYouPage = () => {
  useEffect(() => {
    document.title = "Obrigado pela sua encomenda — MRTUGA";
    try {
      localStorage.removeItem("mrtuga-cart");
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center py-20">
        <CheckCircle2 className="mx-auto h-16 w-16 text-[#FACC15]" strokeWidth={1.5} />
        <h1 className="mt-8 font-montserrat text-3xl md:text-4xl font-bold tracking-tight text-black">
          OBRIGADO PELA SUA ENCOMENDA
        </h1>
        <p className="mt-4 font-inter text-base text-neutral-600 leading-relaxed">
          O seu pagamento foi recebido com sucesso. Vai receber um email de confirmação
          com os detalhes da encomenda e seguimento do envio.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white font-montserrat text-sm font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors"
          >
            Voltar à loja
          </Link>
          <Link
            to="/acompanhar-encomenda"
            className="inline-block px-8 py-3 bg-[#FACC15] text-black font-montserrat text-sm font-semibold tracking-wider uppercase hover:brightness-95 transition"
          >
            Acompanhar encomenda
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
