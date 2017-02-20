function set ( a, b ) { a = b }

function add ( a, b, c ) { a = b + c; }

function sub ( a, b, c ) { a = b - c; }

function mul ( a, b, c ) { a = b * c; }

function div ( a, b, c ) { a = b / c; }

function cumMul ( a, b, c ) { return a += ( b * c ); }

function cpy ( pA_dst, pA_src, pI_len = pA_src.length ) { all1 ( set, pI_len, pA_dst, pA_src ) }

function sp ( pA_src1, pA_src2 ) { return cum2( cumMul, pA_src1.length, pA_src1, pA_src2 ); }

function mns ( pA_src1, pA_src2 ) { return arr ( sub, pA_src1.length, pA_src1, pA_src2 ); }

function pls ( pA_src1, pA_src2 ) { return arr ( add, pA_src1.length, pA_src1, pA_src2 ); }

function MLP ( pAI_sizes = [ 2, 3, 1 ], pD_min = 0, pD_max = 1, pD_eta = .1 ) {

	this.szs   = [ ];
	this.min   = 0;
	this.max   = 0;
	this.rng   = 0;
	this.alpha = 0;
	this.beta  = 0;
	this.gamma = 0;
	this.eta   = 0;
	this.t = [ ];
	this.o = [ ];
	this.d = [ ];
	this.n = [ ];
	this.w = [ ];

	var
	dis = this,
	create = function (  pAI_sizes = [ 2, 3, 1 ], pD_min = 0, pD_max = 1, pD_eta = .1 ) {

		dis.szs = pAI_sizes.slice ( 0 );
		dis.min = pD_min;
		dis.max = pD_max;
		dis.rng = dis.max - dis.min;
		dis.eta = pD_eta;

		dis.t = [ ];
		dis.o = [ ];
		dis.d = [ ];
		dis.n = [ ];
		dis.w = [ ];

		var
		one  = function ( i ) { return 1; },
		zero = function ( i ) { return 0; },
		rnd  = function ( i ) { return dis.min + dis.rng * Math.random ( ); },
		l    = 0;

		dis.o.push ( arr ( [ dis.szs[ 0 ] ], one ) );
		dis.d.push ( arr ( [ 0 ], zero ) );
		dis.n.push ( arr ( [ 0 ], zero ) );

		while ( ++ l < dis.szs.length - 1 ) {

			dis.o.push ( arr ( [ dis.szs[ l ] + 1 ], one ) );
			dis.d.push ( arr ( [ dis.szs[ l ] + 1 ], zero ) );
			dis.n.push ( arr ( [ dis.szs[ l ] + 1 ], zero ) );
		}

		dis.t = arr ( [ dis.szs[ l ] ], zero );
		dis.o.push ( arr ( [ dis.szs[ l ] ], one ) );
		dis.d.push ( arr ( [ dis.szs[ l ] ], zero ) );
		dis.n.push ( arr ( [ dis.szs[ l ] ], zero ) );

		l = -1;

		while ( ++ l < dis.szs.length - 1 ) {

			dis.w.push ( arr ( [ dis.szs[ l + 1 ], dis.szs[ l ] + 1 ], rnd ) );
		}
	},

	__actFct = function ( pD_n ) {

		return dis.rng / ( 1. + Math.exp( -pD_n ) ) + dis.min;
	};

	this.remember = function ( pAD_pattern ) {

		cpy ( this.o[ 0 ], pAD_pattern );

		var
		lf = 0,
		lt = 1;

		while ( lt < this.szs.length ) {

			for ( var nt = 0; nt < this.szs[ lt ]; ++ nt ) {

				this.n[ lt ][ nt ] = sp( this.o[ lf ], this.w[ lf ][ nt ] );

				this.o[ lt ][ nt ] = __actFct( this.n[ lt ][ nt ] );
			}

			lf = lt++;
		}

		return this.o[ this.o.length - 1 ];
	}

	this.rms = function ( ) {

		var
		d_ = mns ( this.t, this.o[ this.szs.length - 1 ] );

		return Math.sqrt ( sp ( d_, d_ ) / this.t.length );
	}

	this.teach = function ( pA_teacher ) {

		this.t = pA_teacher;

		var
		l = this.szs.length - 1;

		for ( var n = 0; n < this.d[ l ].length; ++ n ) {

			var
			o_ = this.o[ l ][ n ];

			this.d[ l ][ n ] = ( this.t[ n ] - o_ ) * ( this.max - o_ ) * ( o_ - this.min ) / this.rng;
		}

		while ( 0 < -- l ) {

			for ( var f = 0; f < this.d[ l ].length; ++ f ) {

				var
				o_ = this.o[ l ][ f ],
				d_ = 0;

				for ( var t = 0; t < this.d[ l + 1 ].length; ++ t )

					d_ += this.d[ l + 1 ][ t ] * this.w[ l ][ t ][ f ];

				this.d[ l ][ f ] = d_ * ( this.max - o_ ) * ( o_ - this.min ) / this.rng;
			}
		}

		for ( var l = 0; l < this.szs.length - 1; ++ l ) {

			for ( var t = 0; t < this.w[ l ].length; ++ t ) {

				var
				d_ = this.d[ l + 1 ][ t ];

				for ( var f = 0; f < this.w[ l ][ t ].length; ++ f ) {

					this.w[ l ][ t ][ f ] += this.eta * this.o[ l ][ f ] * d_;
				}
			}
		}
	}

	create ( pAI_sizes, pD_min, pD_max, pD_eta );
}
