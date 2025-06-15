import './globals.css';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '中国旅游 - 探索东方奇迹',
  description: '为外国游客提供最全面的中国旅游攻略、景点介绍和行程规划',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} 中国旅游. 保留所有权利.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
