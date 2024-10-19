import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, CloudHail } from "lucide-react";
import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  function convertHTMLToText(htmlContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  return (
    <div>
      <Card
        className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl relative group bg-background"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl font-bold tracking-tight text-white text-center px-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {post.title}
            </h2>
          </div>
        </div>
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            {post.category}
          </Badge>
        </div>
        <CardContent className="relative pt-4">
          <h3 className="font-semibold text-slate-800 text-sm leading-relaxed line-clamp-1 dark:text-slate-200">
            {post.title}
          </h3>

          <div className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
            <div>{convertHTMLToText(post?.content)}</div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                {post && (post.content.length / 1000).toFixed(0)} mins read
              </span>
            </div>
            <div className="flex items-center">
              <Link
                to={`/post/${post.slug}`}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium group"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
