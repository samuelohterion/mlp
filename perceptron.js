Arr1 = function ( pI_size = 1, p_value = 0 ) {

	var
	a = [ ];

	for ( var i = 0; i < pI_size; ++i ) {

		a.push ( p_value );
	}

	return a;
}

Arr2 = function ( pI_rows = 1, pI_cols = 1, p_value = 0 ) {

	var
	a = [ ];

	for ( var r = 0; r < pI_rows; ++r ) {

		a.push ( Arr1( pI_cols, p_value ) );
	}

	return a;
}

Arr3 = function ( pI_depth = 1, pI_height = 1, pI_width = 1, p_value = 0 ) {

	var
	a = [ ];

	for ( var i = 0; i < pI_depth; ++i ) {

		a.push ( Arr2( pI_height, pI_width, p_value ) );
	}

	return a;
}

ArrN = function ( pAI_dims, p_value = 0 ) {

	var
	a = [ ];

	for ( var i = 0; i < pI_depth; ++i ) {

		a.push ( Arr2( pI_height, pI_width, p_value ) );
	}

	return a;
}

/*

Perceptron = function ( pD_yMin, pD_yMax, pD_eta, pB_dynamicTresholds ) {

	this.__o = [ ];
	this.__n = [ ];
	this.__d = [ ];

	this.__w = [ ];

	this.__eta = pD_eta;

	this.__design = [ ];

	this.__t = null;

	this.__timesTeached = 0;

	this.__yMin  = pD_yMin;
	this.__yMax  = pD_yMax;
	this.__range = this.__yMax - this.__yMin;
	this.__alpha = -1. / this.__range;
	this.__beta  = this.__yMin + this.__yMax;
	this.__gamma = this.__yMin * this.__yMax;
	this.__dynamicTresholds = pB_dynamicTresholds ? 0 : 1;  //is an offset

	this.resetGenotyp ( );
	this.resetPhenotyp ( );
}

Perceptron.prototype = {

	constructor : Perceptron,

	__actFct	: function ( pD_n ) {

		return this.__range / ( 1. + exp( -pD_n ) ) + this.__yMin;
	},

	__diffActFct : function ( pD_n ) {

		return this.__alpha * ( ( pD_n  - this.__beta ) * p_n + this.__gamma );
	},

	__delta_x_DiffActFct : function ( pI_layerId, pI_neuronId ) {

		this.o_ = this.__o[ pI_layerId ][ pI_neuronId ];

		if( pI_layerId == ( this.__o.size( ) - 1 ) ) {

			return this.__diffActFct( this.o_ ) * ( this.__t[ pI_neuronId ] - this.o_ );
		}

		var
		d_ = 0.;

		for( var nTo = 0; nTo < this.__d[ pI_layerId + 1 ].length; ++nTo ) {

			this.d_ += this.__w[ pI_layerId ][ nTo ][ pI_neuronId ] * this.__d[ pI_layerId + 1 ][ nTo ];
		}

		return this.__diffActFct( this.o_ ) * d_;
	},

	addLayer : function ( pI_numberOfNeurons ) {

		__design.push( pI_numberOfNeurons );
	},

	create : function ( pD_min, pD_max, pD_eta, pB_dynamicTresholds ) {

		if( this.__design.length < 2 ) {

			return;
		}

		this.resetPhenotyp( );

		var
		layerId = 0;

		this.__o.push( Vector( __design[ layerId++ ] + 1 ) );
		this.__n.push( Vector( 0 ) );
		this.__d.push( Vector( 0 ) );

		for( ; layerId < __design.size( ) - 1; ++layerId ) {

			__o.push_back( Vector( __design[ layerId ] + 1 ) );
			__n.push_back( Vector( __design[ layerId ] ) );
			__d.push_back( Vector( __design[ layerId ] ) );
		}

		__o.push_back( Vector( __design[ layerId ] ) );
		__n.push_back( Vector( __design[ layerId ] ) );
		__d.push_back( Vector( __design[ layerId ] ) );

		setRange( p_min, p_max );
		setEta( p_eta );
		setDynamicTresholds( p_dynamicTresholds );

		for( Size l = 0; l < __o.size( ) - 1; ++l ) {

			__o[ l ][ __o[ l ].size( ) - 1 ] = 1;

			__w.push_back( Matrix( __d[ l + 1 ].size( ), Vector( __o[ l ].size( ) ) ) );

			for( Size lT = 0; lT < __d[ l + 1 ].size( ); ++lT ) {

				Size
				lF = 0;

				for( ; lF < __o[ l ].size( ) - 1; ++lF ) {

					__w[ l ][ lT ][ lF ] = __yMin + __range * rand( ) / RAND_MAX;
				}

	//						w[ l ][ lT ][ lF ] = -.5;  // 0 .. 1
				__w[ l ][ lT ][ lF ] = __yMin; // / o[ o.size( ) - 1 ].size( );// -__beta / 2.;  // -1 .. +1
			}
		}
	}
}


My {

	Perceptron::Perceptron( D const &p_yMin, D const &p_yMax, D const &p_eta, B p_dynamicTresholds ) :
	__eta( p_eta ),
	__t( 0 ),
	__timesTeached( 0 ),
	__yMin( p_yMin ),
	__yMax( p_yMax ),
	__range( p_yMax - p_yMin ),
	__alpha( -1. / __range ),
	__beta( __yMin + __yMax ),
	__gamma( __yMin * __yMax ),
	__dynamicTresholds( p_dynamicTresholds ? 0 : 1 ) {

		resetGenotyp( );
		resetPhenotyp( );

		srand48( time_t( 0 ) );
	}

	D
	Perceptron::__actFct( D const &p_n ) const {

		return __range / ( 1. + exp( -p_n ) ) + __yMin;
	}

	D
	Perceptron::__diffActFct( D const &p_n ) const {

		return __alpha * ( ( p_n  - __beta ) * p_n + __gamma );
	}

	D
	Perceptron::__delta_x_DiffActFct( Size const &p_layerId, Size const &p_neuronId ) {

		D
		o_ = __o[ p_layerId ][ p_neuronId ];

		if( p_layerId == ( __o.size( ) - 1 ) ) {

			return __diffActFct( o_ ) * ( __t[ p_neuronId ] - o_ );
		}

		D
		d_ = 0.;

		for( Size nTo = 0; nTo < __d[ p_layerId + 1 ].size( ); ++nTo ) {

			d_ += __w[ p_layerId ][ nTo ][ p_neuronId ] * __d[ p_layerId + 1 ][ nTo ];
		}

		return __diffActFct( o_ ) * d_;
	}

/*
	void
	Perceptron::addInputLayer( Size const &p_size ) {

		o.push_back( Vector( p_size + 1 ) );
		n.push_back( Vector( 0 ) );
		d.push_back( Vector( 0 ) );
	}

	void
	Perceptron::addHiddenLayer( Size const &p_size ) {

		o.push_back( Vector( p_size + 1 ) );
		n.push_back( Vector( p_size ) );
		d.push_back( Vector( p_size ) );
	}

	void
	Perceptron::addOutputLayer( Size const &p_size ) {

		o.push_back( Vector( p_size ) );
		n.push_back( Vector( p_size ) );
		d.push_back( Vector( p_size ) );
	}
*//*
	void
	Perceptron::addLayer( Size const &p_numberOfNeurons ) {

		__design.push_back( p_numberOfNeurons );
	}

	void
	Perceptron::create( D const &p_min, D const &p_max, D const &p_eta, B p_dynamicTresholds ) {

		if( __design.size( ) < 2 ) {

			return;
		}

		resetPhenotyp( );

		Size
		layerId = 0;

		__o.push_back( Vector( __design[ layerId++ ] + 1 ) );
		__n.push_back( Vector( 0 ) );
		__d.push_back( Vector( 0 ) );

		for( ; layerId < __design.size( ) - 1; ++layerId ) {

			__o.push_back( Vector( __design[ layerId ] + 1 ) );
			__n.push_back( Vector( __design[ layerId ] ) );
			__d.push_back( Vector( __design[ layerId ] ) );
		}

		__o.push_back( Vector( __design[ layerId ] ) );
		__n.push_back( Vector( __design[ layerId ] ) );
		__d.push_back( Vector( __design[ layerId ] ) );

		setRange( p_min, p_max );
		setEta( p_eta );
		setDynamicTresholds( p_dynamicTresholds );

		for( Size l = 0; l < __o.size( ) - 1; ++l ) {

			__o[ l ][ __o[ l ].size( ) - 1 ] = 1;

			__w.push_back( Matrix( __d[ l + 1 ].size( ), Vector( __o[ l ].size( ) ) ) );

			for( Size lT = 0; lT < __d[ l + 1 ].size( ); ++lT ) {

				Size
				lF = 0;

				for( ; lF < __o[ l ].size( ) - 1; ++lF ) {

					__w[ l ][ lT ][ lF ] = __yMin + __range * rand( ) / RAND_MAX;
				}

	//						w[ l ][ lT ][ lF ] = -.5;  // 0 .. 1
				__w[ l ][ lT ][ lF ] = __yMin; // / o[ o.size( ) - 1 ].size( );// -__beta / 2.;  // -1 .. +1
			}
		}
	}

	void
	Perceptron::delLayer( Size const &p_layerId ) {

		if( __design.size( ) <= p_layerId ) {

			return;
		}

		for( Size i = p_layerId; i < __design.size( ) - 1; ++i ) {

			__design[ i ] = __design[ i + 1 ];
		}

		__design.pop_back( );
	}

	D
	Perceptron::delta( Size const &p_layer, Size const &p_neuron ) const {

		return __d[ p_layer ][ p_neuron ];
	}


	void
	Perceptron::destroy( ) {

		__o.resize( 0 );
		__n.resize( 0 );
		__d.resize( 0 );
		__w.resize( 0 );
	}

	B
	Perceptron::isCreated( ) const {

		return __o.size( );
	}

	B
	Perceptron::isDesigned( ) const {

		return ( 1 < __design.size( ) && __design[ 0 ] && __design[ 1 ] );
	}

	B
	Perceptron::isTeacherPresent( ) const {

		return __t;
	}

	D
	Perceptron::net( Size const &p_layer, Size const &p_neuron) const {

		return __n[ p_layer ][ p_neuron ];
	}

	Size
	Perceptron::numberOfLayers( ) const {

		return __design.size( );
	}

	Size
	Perceptron::numberOfDeltasInLayer( Size const &p_index ) const {

		return numberOfLayers( ) <= p_index ? 0 : __d[ p_index ].size( );
	}

	Size
	Perceptron::numberOfNetsInLayer( Size const &p_index ) const {

		return numberOfLayers( ) <= p_index ? 0 : __n[ p_index ].size( );
	}

	Size
	Perceptron::numberOfAllOutputsInLayer( Size const &p_index ) const {

		return __o[ p_index ].size( );
	}

	Size
	Perceptron::numberOfRealOutputsInLayer( Size const &p_index ) const {

		return __o[ p_index ].size( ) - ( p_index == numberOfLayers( ) - 1 ? 0 : 1 );
	}

	D
	Perceptron::out( Size const &p_layer, Size const &p_neuron ) const {

		return __o[ p_layer ][ p_neuron ];
	}

	void
	Perceptron::remember( D const *const p_datas ) {

		std::copy( p_datas, p_datas + __o[ 0 ].size( ) - 1, __o[ 0 ].begin( ) );

		for( Size l = 1; l < __o.size( ); ++l ) {

			for( Size lT = 0; lT < __n[ l ].size( ); ++lT ) {

				__n[ l ][ lT ] = 0.;

				for( Size lF = 0; lF < __o[ l - 1 ].size( ); ++lF ) {

					__n[ l ][ lT ] += __w[ l - 1 ][ lT ][ lF ] * __o[ l - 1 ][ lF ];
				}

				__o[ l ][ lT ] = __actFct( __n[ l ][ lT ] );
			}
		}
	}

	D
	Perceptron::rms( D const *const p_datas ) const {

		D const
		*t_ = p_datas ? p_datas : __t;

		D
		ret = 0.;

		for( Size n = 0; n < __o[ __o.size( ) - 1 ].size( ); ++n ) {

			D
			d_ = t_[ n ] - __o[ __d.size( ) - 1 ][ n ];

			ret += ( d_ * d_ );
		}

		ret = sqrt( ret / __d[ __d.size( ) - 1 ].size( ) );

		return ret;
	}

	void
	Perceptron::resetGenotyp( ) {

		__design.resize( 0 );
	}

	void
	Perceptron::resetPhenotyp( ) {

		__o.resize( 0 );
		__n.resize( 0 );
		__d.resize( 0 );
		__w.resize( 0 );
	}

	void
	Perceptron::setEta( D const &p_eta ) {

		__eta = p_eta;
	}

	void
	Perceptron::setLayer( Size const &p_layerId, Size const &p_numberOfNeurons ) {

		if( __design.size( ) <= p_layerId ) {

			return;
		}

		__design[ p_layerId ] = p_numberOfNeurons;
	}

	void
	Perceptron::setRange( D const &p_min, D const &p_max ) {

		__yMin = p_min;
		__yMax = p_max;
		__range = p_max - p_min;
		__alpha = -1. / __range;
		__beta = __yMin + __yMax;
		__gamma = __yMin * __yMax;
	}

	void
	Perceptron::setDynamicTresholds( B const &p_dynamicTresholds ) {

		__dynamicTresholds = p_dynamicTresholds ? 0 : 1;
	}

	void
	Perceptron::teach( D const *const p_datas ) {

		__t = p_datas;

		Size const
		outputLayerId = __o.size( ) - 1;

		for( Size lT = 0; lT < __o[ outputLayerId ].size( ); ++lT ) {

	//					D
	//					o_ = o[ outputLayerId ][ lT ];

	//					d[ outputLayerId ][ lT ] = o_ * ( 1. - o_ ) * ( t[ lT ] - o_ );
			__d[ outputLayerId ][ lT ] = __delta_x_DiffActFct( outputLayerId, lT );

			for( Size lF = 0; lF < __o[ outputLayerId - 1 ].size( ) - __dynamicTresholds; ++lF ) {

				__w[ outputLayerId - 1 ][ lT ][ lF ] += __eta * __d[ outputLayerId ][ lT ] * __o[ outputLayerId - 1 ][ lF ];
			}
		}

		for( Size l = outputLayerId - 1; 0 < l; --l ) {

			for( Size lT = 0; lT < __o[ l ].size( ) - 1; ++lT ) {

				__d[ l ][ lT ] = __delta_x_DiffActFct( l, lT );

				for( Size lF = 0; lF < __o[ l - 1 ].size( ) - __dynamicTresholds; ++lF ) {

					__w[ l - 1 ][ lT ][ lF ] += __eta * __d[ l ][ lT ] * __o[ l - 1 ][ lF ];
				}
			}
		}

		++__timesTeached;
	}

	D
	Perceptron::teacher( Size const &p_id ) const {

		return __t[ p_id ];
	}

	Size
	Perceptron::timesTeached( ) const {

		return __timesTeached;
	}

	D
	Perceptron::weight( Size const &p_layerFrom, Size const &p_neuronFrom, Size const &p_neuronTo ) const {

		return __w[ p_layerFrom ][ p_neuronTo ][ p_neuronFrom ];
	}

	Size
	Perceptron::weights( Size const &p_layer ) const {

		return __w[ p_layer ].size( );
	}
}

*/
