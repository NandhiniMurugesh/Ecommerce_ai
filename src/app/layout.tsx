// import './globals.css';
// import { ReactNode } from 'react';
// import { ClerkProvider } from '@clerk/nextjs';
// import { CartProvider } from '@/context/CartContext';
// import Navbar from './components/Navbar';
// import Script from 'next/script';
// import ChatBot from './components/ChatBot';


// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* You can add other head tags here */}
//       </head>
//       <body>
//         <ClerkProvider>
//           <CartProvider>
//             <Navbar />
//             {children}

//             {/* Razorpay script */}
//             <Script
//               src="https://checkout.razorpay.com/v1/checkout.js"
//               strategy="beforeInteractive"
//             />
           
//     {/* <script src="https://cdn.botpress.cloud/webchat/v2.3/inject.js"></script>
// <script src="https://files.bpcontent.cloud/2025/04/24/08/20250424085238-ZYOA422U.js"></script> */}
    

//             {/* BotPress Web Chat Script */}
//        <ChatBot/>
//           </CartProvider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }

import './globals.css';
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/context/CartContext';
import Navbar from './components/Navbar';
import ChatBot from './components/Chatbot';
import Footer from './components/Footer';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <CartProvider>
            <Navbar />
            {children}
            <ChatBot/> {/* Load the bot only once here */}
            <Footer/>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

