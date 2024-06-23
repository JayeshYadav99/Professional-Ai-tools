import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>AI Tools Home</title>
        <meta name="description" content="Various AI tools for image processing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">AI Tools</h1>
        </div>
      </header>

      <main className="container mx-auto flex-grow py-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Explore Our Image AI Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Image Recognition"
            description="Identify objects in images using state-of-the-art AI models."
            imageUrl="https://th.bing.com/th/id/OIG3..ICcLHwHYThdp3TSHp.s?pid=ImgGn"
          />
          <Card
            title="Image Enhancement"
            description="Improve the quality of your images with AI."
            imageUrl="https://th.bing.com/th/id/OIG3.bJjoZgxFaaytoccEt1i6?w=1024&h=1024&rs=1&pid=ImgDetMain"
          />
          <Card
            title="Image Generation"
            description="Generate new images from text descriptions."
            imageUrl="https://th.bing.com/th/id/OIG3.EYPzcL3r9u5W1thAoI6m?pid=ImgGn"
          />
          {/* Add more cards as needed */}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AI Tools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const Card = ({ title, description, imageUrl }:any) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
)
