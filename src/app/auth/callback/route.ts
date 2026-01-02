import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const scheme = searchParams.get('scheme');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (!scheme) {
    return NextResponse.json(
      { error: 'Missing "scheme" query parameter' },
      { status: 400 }
    );
  }

  // Construct the deep link URL
  const baseUrl = `${scheme}://auth-callback`;
  const params = new URLSearchParams();

  if (code) params.append('code', code);
  if (error) params.append('error', error);
  if (errorDescription) params.append('error_description', errorDescription);

  // Also forward any other query params that might be relevant
  searchParams.forEach((value, key) => {
    if (!['code', 'scheme', 'error', 'error_description'].includes(key)) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const redirectUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  // Redirect to the client-side redirection page with the target URL
  return NextResponse.redirect(new URL(`/auth/redirect?url=${encodeURIComponent(redirectUrl)}`, request.url));
}
