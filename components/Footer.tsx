import React from 'react'
import Image from 'next/image'
import Container from './Container'
import { Github, Linkedin } from 'lucide-react'
import logo from '../assets/successkeyagency-logo.png'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-10 mt-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="SuccessKeyAgency Logo"
                width={150}
                height={60}
                className="rounded"
              />
              
            </div>
            <p className="mt-2 text-green-500">Innovate | Maintain | Scale</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-white">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition">Shop</a></li>
              <li><a href="/" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Let’s Connect</h3>
            <p className="text-gray-400 mb-2">
              Want to work with us? <br />
              Contact us at{' '}
              <a href="mailto:contact@successkeyagency.com" className="text-white underline">
                contact@successkeyagency.com
              </a>
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/successkeyagency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/williamngumo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} SuccessKeyAgency LLC. All Rights Reserved. <br />
          Made with <span className="text-green-500">❤️</span> By <span className="text-amber-600 font-medium">William Ngumo</span> at <span className="text-green-500 font-semibold">SuccessKeyAgency</span>.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
