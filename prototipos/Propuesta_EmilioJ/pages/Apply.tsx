import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Apply: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams();

  const handleSubmit = () => {
    // Logic to submit application
    navigate('/my-applications');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-4 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 text-[#111418] dark:text-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-[#111418] dark:text-white">
          Postularse
        </h1>
        <div className="w-9"></div>
      </header>
      <main className="flex flex-1 flex-col p-6 text-[#111418] dark:text-white">
        <div className="space-y-6">
          <div>
            <label
              className="text-base font-medium text-[#111418] dark:text-white"
              htmlFor="cv"
            >
              Adjuntar CV (opcional)
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-6 py-10 bg-white dark:bg-slate-900">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
                  upload_file
                </span>
                <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400 justify-center">
                  <label
                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 hover:text-primary/90 dark:focus-within:ring-offset-background-dark"
                    htmlFor="file-upload"
                  >
                    <span>Sube un archivo</span>
                    <input
                      className="sr-only"
                      id="file-upload"
                      name="file-upload"
                      type="file"
                    />
                  </label>
                  <p className="pl-1">o arrástralo aquí</p>
                </div>
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-500">
                  PDF, DOCX hasta 5MB
                </p>
              </div>
            </div>
          </div>
          <div>
            <label
              className="text-base font-medium text-[#111418] dark:text-white"
              htmlFor="message"
            >
              Mensaje para el empleador (opcional)
            </label>
            <textarea
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-[#111418] placeholder:text-gray-400 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary form-textarea"
              id="message"
              name="message"
              placeholder="Escribe un mensaje presentándote..."
              rows={6}
            ></textarea>
          </div>
          <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="text-base font-semibold">Información Adicional</h3>
            <p className="mt-1 text-sm text-[#617289] dark:text-gray-400">
              Esta información se enviará con tu postulación.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
                  <span className="text-base text-[#111418] dark:text-white">
                    correo@email.com
                  </span>
                </div>
                <button className="text-sm font-medium text-primary hover:text-primary/90">
                  Cambiar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    phone
                  </span>
                  <span className="text-base text-[#111418] dark:text-white">
                    +54 342 1234567
                  </span>
                </div>
                <button className="text-sm font-medium text-primary hover:text-primary/90">
                  Cambiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 w-full bg-white dark:bg-background-dark p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
        <div className="flex w-full">
          <button
            onClick={handleSubmit}
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <span className="truncate">Enviar Postulación</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Apply;
