import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  // CORREÇÃO: Definimos o scheme fixo do seu app aqui
  const scheme = "runbr"; 
  
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Construct the deep link URL
  // O app espera receber em 'strava-callback', não 'auth-callback'
  const baseUrl = `${scheme}://strava-callback`; 
  const params = new URLSearchParams();

  if (code) params.append('code', code);
  if (error) params.append('error', error);
  if (errorDescription) params.append('error_description', errorDescription);

  // Repassa outros parâmetros se houver
  searchParams.forEach((value, key) => {
    if (!['code', 'scheme', 'error', 'error_description'].includes(key)) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const redirectUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  // Redireciona para a página bonita de loading do seu site
  return NextResponse.redirect(new URL(`/auth/redirect?url=${encodeURIComponent(redirectUrl)}`, request.url));
}