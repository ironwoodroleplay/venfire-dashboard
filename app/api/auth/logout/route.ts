import {NextResponse} from 'next/server';export async function POST(req:Request){const r=NextResponse.redirect(new URL('/',req.url),303);r.cookies.delete('vf_session');return r;}
