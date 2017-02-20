function arr ( pAI_sizes, pFct_fct ) {

	var
	idx = [ ];

	for ( var i = 0; i < pAI_sizes.length; ++ i )

		idx.push ( 0 );

	function A ( p_fct, pI_idx = 0 ) {

		var
		rt = [ ];

		idx[ pI_idx ] = 0;

		for ( var i = 0; i < pAI_sizes[ pI_idx ]; ++ i ) {

			if ( pAI_sizes.length - 1 <= pI_idx )

				rt.push ( p_fct( idx ) );

			else

				rt.push ( A ( p_fct, pI_idx + 1 ) );

			++ idx[ pI_idx ];
		}

		return rt;
	}

	return A ( pFct_fct );
}

function all0 ( pFct_fct, pI_len, pA_dst ) { for ( var i = 0; i < pI_len; ++i ) pA_dst[ i ] = pFct_fct( pA_dst[ i ] ); }

function all1 ( pFct_fct, pI_len, pA_dst, pA_src ) { for ( var i = 0; i < pI_len; ++i ) pA_dst[ i ] = pFct_fct( pA_dst[ i ], pA_src[ i ] ); }

function all2 ( pFct_fct, pI_len, pA_dst, pA_src1, pA_src2 ) { for ( var i = 0; i < pI_len; ++i ) pA_dst[ i ] = pFct_fct( pA_dst[ i ], pA_src1[ i ], pA_src2[ i ] ); }

function cum1 ( pFct_fct, pI_len, pA_src ) { var dst = 0; for ( var i = 0; i < pI_len; ++i ) dst = pFct_fct( dst, pA_src[ i ] ); return dst; }

function cum2 ( pFct_fct, pI_len, pA_src1, pA_src2 ) { var dst = 0; for ( var i = 0; i < pI_len; ++i ) dst = pFct_fct( dst, pA_src1[ i ], pA_src2[ i ] ); return dst; }

function pr ( p_text ) { if ( p_text instanceof Array ) for ( var i = 0; i < p_text.length; ++ i ) pr( p_text[ i ] ); else console.log ( p_text ); }


function rel ( pFct_fct, pA_src1, pA_src2 ) {

	var
	r = [ ];

	for ( var i = 0; i < pA_src1.length; ++ i ) {

		r.push ( pFct_fct ( pA_src1[ i ], pA_src2[ i ] ) );
	}

	return r;
}

function cum ( pFct_fct, pA_src ) {

	var
	r = 0;

	for ( var i = 0; i < pA_src.length; ++ i ) {

		r = pFct_fct ( r, pA_src[ i ] ) );
	}

	return r;
}


function scalarProduct ( pA_src1, pA_src2 ) {

	return cum (

		function ( a, b ) {

			a += b;
		},
		rel (

			function ( a, b ) {

				return a * b;
			},
			pA_src1,
			pA_src2
		)
	)
}

function difference ( pA_src1, pA_src2 ) {

	return rel (

		function ( a, b ) { return a - b; }
		pA_src1,
		pA_src2
	)
}
