"use client"
// import Head from 'next/head'

export default function LoginPage(){
    return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">     
    {/* <Head>
        <title>Couille</title>
        <link rel="icon" href="/favicon.ico"></link>
    </Head> */}

    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl"></div>
        {/*Sign In Section*/}
        <div className="w-3/5 p-5">
            <p>Sign In Section</p>
        </div>

        {/*Sign Up Section*/}
        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl">
            <h2 className="text-3xl font-bold mb-2">Hello, friend !</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">LA BITE DE CON LA</p>
            <a href="#" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white"></a>
        </div>
    </main>
    </div>
    )
}