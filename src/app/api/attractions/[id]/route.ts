import { NextRequest, NextResponse } from 'next/server';
import { getAttractionById, incrementAttractionPopularity } from '@/lib/api/attractions';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: '景点ID不能为空' },
        { status: 400 }
      );
    }
    
    const attraction = await getAttractionById(id);
    
    if (!attraction) {
      return NextResponse.json(
        { error: '景点不存在' },
        { status: 404 }
      );
    }
    
    // 增加景点热度
    await incrementAttractionPopularity(id);
    
    return NextResponse.json(attraction);
  } catch (error) {
    console.error('获取景点详情失败:', error);
    return NextResponse.json(
      { error: '获取景点详情失败' },
      { status: 500 }
    );
  }
} 