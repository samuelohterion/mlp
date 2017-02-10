function Arr ( pAI_sizes, pFct_fct ) {

	var
	idx = [ ];

	for ( var i = 0; i < pAI_sizes.length; ++ i )

		idx.push ( 0 );

	function A ( pAI_sizes, p_fct, pI_idx = 0 ) {

		var
		rt = [ ];

		idx[ pI_idx ] = 0;

		if ( pAI_sizes.length - 1 <= pI_idx ) {

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
