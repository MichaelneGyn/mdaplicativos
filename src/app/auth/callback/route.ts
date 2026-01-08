import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Esquema do seu app (runbr://)
  const scheme = "runbr"; 
  
  // Constrói o deep link para a tela de login
  const baseUrl = `${scheme}://login`; 
  
  // Prepara os parâmetros para repassar ao app
  const params = new URLSearchParams();
  
  // Repassa todos os parâmetros recebidos do Supabase (access_token, refresh_token, error, etc.)
  searchParams.forEach((value, key) => {
    params.append(key, value);
  });

  const queryString = params.toString();
  const deepLink = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  // Redireciona para a sua página de redirect visual (auth/redirect)
  // Passando o deep link como parâmetro 'url'
  return NextResponse.redirect(new URL(`/auth/redirect?url=${encodeURIComponent(deepLink)}`, request.url));
}
