
	if(typeof window!="undefined" && typeof window.nongsaro=="undefined"){
		window.nongsaro=new Object;
	}

	var nongsaroOpenApiRequest={};
	var requestParam = {};

	var nongsaroJ = $.noConflict();

	nongsaroJ(document).ready(function() {
		actionNongsaroOpenApi();

		//출처 문구 삽입
		nongsaroJ('div[id^=nongsaroApiLoadingArea').last().after('<p style="text-align: left; font-size: 12px; margin: 20px 0"><img src="http://www.nongsaro.go.kr/ps/img/nongsaroAdd/sedum/icon1.gif" alt="" style="vertical-align: middle; margin: 0 8px 0;">본 정보는 농촌진흥청의 <a href="http://www.nongsaro.go.kr" target="_blank" style="font-weight:bold;">농업기술포털 농사로(http://www.nongsaro.go.kr)</a>에서 제공하고 있습니다.</p>');
    });


	function actionNongsaroOpenApi(){

		var serviceName = nullToSpace(nongsaroOpenApiRequest.serviceName);
		var operationName = nullToSpace(nongsaroOpenApiRequest.operationName);
		var htmlArea = nullToSpace(nongsaroOpenApiRequest.htmlArea);

		var a = []; var data = "";
		for(var k in nongsaroOpenApiRequest){
			if(!(k == "serviceName" || k == "operationName" || k == "callback")){
				v = nongsaroOpenApiRequest[k];
				a[a.length] = k+"="+encodeURIComponent(v);
			}
		}

		data = a.join("&");
		data += "&serviceType=ajaxType";

		var reqUrl = nongsaroOpenApiRequest.callback;

		data = serviceName+"/"+operationName+"?"+data;

		var asyncFlag = false;

		//예외처리 목록
		var expServiceArr = new Array();

		expServiceArr.push("garden");		//실내정원
		expServiceArr.push("dryGarden");	//건조에 강한 실내식물

		if(nongsaroJ.inArray(serviceName, expServiceArr) != -1){
			asyncFlag = true;
		}

		nongsaroJ.ajax({
			type: "get"
			, dataType: "html"
			, url: reqUrl
			, data: data
			, async:asyncFlag
			, success: function(html){
				nongsaroJ('#'+htmlArea).html(html);
			}
			, error: function(xhr, status, error) {
				alert("서비스 중 오류가 발생하였습니다.");
			}
		});
	}

	function nullToSpace(str){
		return str==null || str=="undefined" ? "" : str;
	}