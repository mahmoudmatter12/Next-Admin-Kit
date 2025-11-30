import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * API Route to read markdown documentation files
 *
 * Usage: /api/docs/[path]
 * Example: /api/docs/SETUP_GUIDE.md
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params;

    // Decode the path (in case it has encoded characters)
    const decodedPath = decodeURIComponent(path);

    // Security: Prevent path traversal attacks
    if (decodedPath.includes('..') || decodedPath.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Get the project root directory
    const projectRoot = process.cwd();

    // Construct the full file path
    const filePath = join(projectRoot, decodedPath);

    // Read the markdown file
    const fileContent = await readFile(filePath, 'utf-8');

    return NextResponse.json({
      content: fileContent,
      path: decodedPath,
    });
  } catch (error) {
    console.error('Error reading documentation file:', error);

    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
