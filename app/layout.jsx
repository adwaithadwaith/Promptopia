import '@styles/globals.css';
import Navbar from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptopia",
    description: "Discover & share prompts",
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Navbar/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout