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
/*
function all ( pArr_arr, pFct_fct ) {

	var
	idx = [ ],
	szs = [ ],
	t   = pArr_arr;

	while ( t instanceof Array ) {

		idx.push ( 0 );
		szs.push ( t );

		t = t[ 0 ];
	}

	function A ( pArr_arr, p_fct, pI_idx = 0 ) {

		var
		rt = [ ];

		idx[ pI_idx ] = 0;

		if ( szs.length - 1 <= pI_idx ) {

			for ( var i = 0; i < pAI_sizes[ pI_idx ]; ++ i ) {

				rt.push ( p_fct( idx ) );

				++ idx[ pI_idx ];
			}

			return rt;
		}

		for ( var i = 0; i < pAI_sizes[ pI_idx ]; ++ i ) {

			rt.push ( A ( pAI_sizes, p_fct, pI_idx + 1 ) );

			++ idx[ pI_idx ];
		}

		return rt;
	}

	return A ( pAI_sizes, pFct_fct );
}

*/
