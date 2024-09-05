import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">SAFE-T(ech)</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold">Company</h3>
                <nav className="mt-4">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        History
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Services
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div>
                <h3 className="font-semibold">Resources</h3>
                <nav className="mt-4">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:opacity-75">
                        Partners
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Newsletter</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Stay updated with our latest news and offers.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SAFE-T(ech). All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:opacity-75">
              <span className="sr-only">Facebook</span>
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:opacity-75">
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:opacity-75">
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:opacity-75">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
