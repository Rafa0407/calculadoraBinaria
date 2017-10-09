(function(){
	'use strict'

	angular.module('design').controller('MainController', MainController);

	MainController.$inject = ['$scope'];
	function MainController(){
		let vm = this;
		vm.s1;
		vm.s2;
		vm.r1;
		vm.r2;
		vm.m1;
		vm.m2; 

		vm.resultadoSumaBinario = 0;
		vm.resultadoSumaDecimal = 0;
		vm.resultadoRestaDecimal = 0;
		vm.resultadoRestaBinaria = 0;
		vm.resultadoMultiplicacionBinaria = 0;
		vm.resultadoMultiplicacionDecimal = 0;
		vm.resultadoDivBin = 0;
		vm.resultadoDivDec = 0;


		//SCRIPT CONVERTIR BINARIO A DECIMAL
		vm.convertir_binario = function (valor){
			var array = [];
			var numeros = valor.split("");
			var entero = 0;
			var contador = 0;
			for(var i = numeros.length-1; i>=0;i--){
				if(numeros[i] == 0){
					array[i] = 0;
				}
				else{
					array[i] = Math.pow(2,contador);
				}
				contador++;
			}
			for(var a = 0; a < array.length; a++){
				entero += array[a];
			}
			return entero;
		}

		//SCRIPT CONVERTIR DECIMAL A BINARIO
		vm.convertir_entero = function (valor){
			let resul_div = [];
			let entradas = 0;
			let resultado_binario = '';
			while(valor > 0){
				let residuo = parseInt(valor % 2);
				valor = parseInt(valor/2);
				resul_div[entradas] = residuo;
				entradas++;
			}
			for (var i = resul_div.length - 1; i >= 0; i--) {
				resultado_binario += resul_div[i];
			}
			return resultado_binario;
		}


		//SCRIPT PARA SUMAR BINARIOS
		vm.suma_binarios = function(b1,b2){
			let numerob1 = b1.split("");
			let numerob2 = b2.split("");
			let principal = (numerob1.length>numerob2.length || numerob1.length==numerob2.length) ? b1 : b2;
			let secundario = (numerob1.length<numerob2.length) ? b1 : b2;
			let minuendo = principal.split("");
			let sustraendo = secundario.split("");
			let lleva = 0;
			let resultado_arreglo = [];
			let array_sus = [];
			let pos;

			for (var i = 0; i < minuendo.length; i++) {
				array_sus.push(sustraendo[i]);
				if(array_sus[i] === undefined){
					array_sus.unshift('');
					array_sus.pop();
				}
			}

			for (var i = minuendo.length - 1; i >= 0; i--) {
				if(minuendo[i] == lleva){
					minuendo[i] = 0;
				} else {
					minuendo[i] = 1;
					lleva = 0;
				}
				if(minuendo[i] != array_sus[i]){
					resultado_arreglo[i] = 1;
				} else if(minuendo[i] == array_sus[i] && minuendo[i] != 1 && array_sus[i] != 1){
					resultado_arreglo[i] = 0;
				} else if(minuendo[i] == array_sus[i] && minuendo[i] == 1 && array_sus[i] == 1){
					lleva = 1;
					resultado_arreglo[i] = 0;
				}
				if(i == 0 && lleva == 1){
					resultado_arreglo.unshift(1);
				}
			};

			let resultado_suma_binario = '';
			for(var a = 0; a < resultado_arreglo.length; a++){
				resultado_suma_binario+=resultado_arreglo[a];
			}
			//vm.resultadoSumaDecimal = vm.convertir_binario(resultado_suma_binario);
			// vm.resultadoSumaBinario = resultado_suma_binario;
			return resultado_suma_binario;
		}

		vm.sumaBinaria = function(s1, s2){
			if(s1 && s2 != undefined){
				let resultadoBinario = vm.suma_binarios(s1,s2);
				vm.resultadoSumaBinario = resultadoBinario;
				vm.resultadoSumaDecimal = vm.convertir_binario(resultadoBinario);
			}
			else {
				vm.resultadoSumaBinario = 0;
				vm.resultadoSumaDecimal = 0;
			}

		} 

		vm.multiplicacionBinaria = function(m1, m2){
			let res =0;
			let multi1 = vm.convertir_binario(m1);
			let multi2 = vm.convertir_binario(m2);
			console.log(multi1);
			console.log(multi2);
			if(multi1 && multi2 != undefined){
				res = multi1 * multi2;
				console.log(res); 
				vm.resultadoMultiplicacionDecimal = res;
	
				vm.resultadoMultiplicacionBinaria = vm.convertir_entero(res);
				console.log(vm.convertir_entero(res));	
			}
			else {
				vm.resultadoMultiplicacionBinaria = 0; 
				vm.resultadoMultiplicacionDecimal = 0; 
			}

			
		} 
		vm.divBinaria = function (d1 , d2){
			let res =0;
			let div1 = vm.convertir_binario(d1);
			let div2 = vm.convertir_binario(d2); 
			if(d2 == 0){
				alert("No Se permite división entre 0")
			}
			else {
				res = div1/div2;
				vm.resultadoDivDec = res; 
				vm.resultadoDivBin = vm.convertir_entero(res);
			}
		}

		//SCRIPT PARA RESTAR BINARIOS
		vm.resta_binarios = function (b1,b2){
			if(b1 != b2){
				let numerob1 = b1.split("");
				let numerob2 = b2.split("");
				let principal = (numerob1.length>numerob2.length || numerob1.length==numerob2.length) ? b1 : b2;
				let secundario = (numerob1.length<numerob2.length) ? b1 : b2;
				let minuendo = principal.split("");
				let sustraendo = secundario.split("");
				let sustraendo_inicial = '1';
				let invertir_minuendo = [];
				let minuendo_suma_final = [];
				let invertir_minuendo_suma_final = [];
				let minuendo_final = '';
				for(var i = 0; i < minuendo.length; i++){
					invertir_minuendo[i] = (minuendo[i] == 0) ? 1 : 0;
				}
				let primera_suma = vm.suma_binarios(invertir_minuendo.join(""),sustraendo_inicial);
				let seg_suma_binarios = vm.suma_binarios(primera_suma,sustraendo.join(""));
				minuendo_suma_final = seg_suma_binarios.split("");
				for(var j = 0; j < minuendo_suma_final.length; j++){
					invertir_minuendo_suma_final[j] = (minuendo_suma_final[j] == 0) ? 1 : 0;
				}
				let resta_final = vm.suma_binarios(invertir_minuendo_suma_final.join(""),sustraendo_inicial);
				vm.resultadoRestaBinaria = resta_final;
				vm.resultadoRestaDecimal = vm.convertir_binario(resta_final);
				// $(".restadec").val(convertir_binario(resta_final));
				return resta_final;
			} else {
				// $(".restadec").val(0);
				vm.resultadoRestaDecimal = 0;
				vm.resultadoRestaBinaria = 0;
				return 0;
			}

		}

		/*$(function(){

		$(".sumbin2").keyup(function(){
		$(".ressuma").val(suma_binarios($(this).val(),$(".sumbin1").val()));
	});
	$(".restabin2").keyup(function(){
	$(".restatotal").val(resta_binarios($(this).val(),$(".restabin").val()));

});
});*/
}
})();
