import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* 页面标题 */}
          <div className="border-b border-gray-200 bg-primary-red bg-opacity-10 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">个人中心</h1>
            <p className="text-sm text-gray-600 mt-1">管理您的账户和偏好设置</p>
          </div>
          
          {/* 标签页导航 */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <a
                href="#"
                className="border-b-2 border-primary-red text-primary-red px-6 py-3 text-sm font-medium"
              >
                基本信息
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-6 py-3 text-sm font-medium"
              >
                安全设置
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-6 py-3 text-sm font-medium"
              >
                偏好设置
              </a>
            </nav>
          </div>
          
          {/* 个人信息表单 */}
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-24 w-24 rounded-full bg-primary-blue flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">头像</h2>
                <div className="mt-1 flex items-center space-x-4">
                  <Button variant="secondary" size="sm">
                    更换头像
                  </Button>
                  <Button variant="outline" size="sm">
                    删除
                  </Button>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="姓名"
                  defaultValue="John Doe"
                />
                
                <Input
                  id="username"
                  name="username"
                  type="text"
                  label="用户名"
                  defaultValue="johndoe"
                />
                
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="电子邮箱"
                  defaultValue="johndoe@example.com"
                />
                
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="电话号码"
                  defaultValue="+1 (555) 123-4567"
                />
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    语言偏好
                  </label>
                  <select
                    id="language"
                    name="language"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                  >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">
                  取消
                </Button>
                <Button>
                  保存更改
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 