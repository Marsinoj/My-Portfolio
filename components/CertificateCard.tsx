type Props = {
  title: string;
  image: string;
};

export default function CertificateCard({ title, image }: Props) {
  return (
    <div className="bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transition-transform">
      <img
        src={image}
        alt={title}
        className="rounded-lg mb-4 border border-gray-700"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}