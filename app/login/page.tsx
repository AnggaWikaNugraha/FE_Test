import LoginForm from "./_components/Login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section */}
      <div className="flex flex-col justify-center items-center bg-white md:w-1/2 w-full px-6 py-10">
        {/* 🔹 Logo Jalan Tol */}
        <div className="w-48 sm:w-64 mb-8 flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
            fill="none"
            className="w-36 h-20"
          >
            {/* Jalan */}
            <rect x="0" y="60" width="200" height="40" fill="#2E3A59" />
            {/* Garis jalan */}
            <rect x="10" y="78" width="20" height="4" fill="#FCD34D" />
            <rect x="50" y="78" width="20" height="4" fill="#FCD34D" />
            <rect x="90" y="78" width="20" height="4" fill="#FCD34D" />
            <rect x="130" y="78" width="20" height="4" fill="#FCD34D" />
            <rect x="170" y="78" width="20" height="4" fill="#FCD34D" />
            {/* Gerbang Tol */}
            <rect x="70" y="30" width="60" height="30" rx="2" fill="#0EA5E9" />
            <rect x="85" y="20" width="30" height="10" rx="2" fill="#0284C7" />
            {/* Tulisan */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fill="#1E293B"
              fontSize="14"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
            >
              TOLL ACCESS
            </text>
          </svg>

          <h1 className="text-gray-700 font-semibold text-lg tracking-wide">
            Sistem Lalu Lintas Tol
          </h1>
        </div>

        {/* 🔹 Form Login */}
        <LoginForm />
      </div>

      {/* Right section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        {/* 🔹 SVG Ilustrasi Mobil di Jalan Tol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 300"
          fill="none"
          className="w-4/5 h-auto"
        >
          {/* Langit */}
          <rect width="500" height="300" fill="#E0F2FE" />
          {/* Jalan */}
          <rect y="200" width="500" height="100" fill="#334155" />
          {/* Marka jalan */}
          <rect x="20" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="90" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="160" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="230" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="300" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="370" y="245" width="40" height="6" fill="#FACC15" />
          <rect x="440" y="245" width="40" height="6" fill="#FACC15" />
          {/* Mobil */}
          <rect x="150" y="180" width="200" height="60" rx="10" fill="#0EA5E9" />
          <rect
            x="180"
            y="160"
            width="140"
            height="40"
            rx="8"
            fill="#38BDF8"
          />
          {/* Jendela */}
          <rect x="190" y="170" width="40" height="20" rx="3" fill="#E0F2FE" />
          <rect x="250" y="170" width="40" height="20" rx="3" fill="#E0F2FE" />
          {/* Roda */}
          <circle cx="190" cy="240" r="15" fill="#1E293B" />
          <circle cx="310" cy="240" r="15" fill="#1E293B" />
          <circle cx="190" cy="240" r="6" fill="#CBD5E1" />
          <circle cx="310" cy="240" r="6" fill="#CBD5E1" />
          {/* Gerbang Tol di belakang */}
          <rect x="350" y="100" width="60" height="80" fill="#64748B" />
          <rect x="90" y="100" width="60" height="80" fill="#64748B" />
          <rect x="150" y="120" width="200" height="10" fill="#94A3B8" />
          <text
            x="250"
            y="117"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            GERBANG TOL
          </text>
        </svg>
      </div>
    </div>
  );
}
