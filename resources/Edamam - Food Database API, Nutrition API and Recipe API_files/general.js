notices = new Array();
url = new Array();

var orgName,
    userName,
    email,
    password,
    accountId,
    list;

var applicationPlanId	= '0',
    servicePlanId		= '0';

var userStatus 		= 'notlogged',
	apiStatus		= 'notlogged',
	serviceStatus	= 'notlogged';

var edamamUser 		= 'user';

var nutritionPlanId = '2357356416921',
	recipePlanId 	= '2357356416931',
	foodPlanId 		= '2357356416932',
	mealPlanId		= '2357356444775',
	recipePlanId1 	= '2357356466375',
	foodPlanId1		= '2357356466376';

var userTitle 		= '';

/* ...... URL's ......*/ 
url['developer-url']						= 'https://developer.edamam.com/';
url['api-url']								= '';

url['temp-developer-url']		 			= '';

url['api-recipe-url'] 						= 'https://developer.edamam.com/edamam-recipe-api';
url['api-demo-recipe-url'] 					= 'https://developer.edamam.com/recipe-demo';
url['api-docs-recipe-url'] 					= 'https://developer.edamam.com/edamam-docs-recipe-api';

url['api-food-database-url'] 				= 'https://developer.edamam.com/food-database-api';
url['api-demo-food-database-url'] 			= 'https://developer.edamam.com/food-database-api-demo';
url['api-docs-food-database-url'] 			= 'https://developer.edamam.com/food-database-api-docs';

url['api-nutrition-url'] 					= 'https://developer.edamam.com/edamam-nutrition-api';
url['api-demo-nutrition-url'] 				= 'https://developer.edamam.com/edamam-nutrition-api-demo';
url['api-docs-nutrition-url'] 				= 'https://developer.edamam.com/edamam-docs-nutrition-api';

//url['api-recipe-url'] 					= '/api/recipe';
//url['api-demo-recipe-url'] 				= '/api/demo/recipe';
//url['api-docs-recipe-url'] 				= '/api/docs/recipe';

//url['api-food-database-url'] 				= '/api/food-database';
//url['api-demo-food-database-url'] 		= '/api/demo/food-database';
//url['api-docs-food-database-url'] 		= '/api/docs/food-database';

//url['api-nutrition-url'] 					= '/api/nutrition';
//url['api-demo-nutrition-url'] 			= '/api/demo/nutrition';
//url['api-docs-nutrition-url'] 			= '/api/docs/nutrition';

// FRONT-END MESSAGES
notices['email-empty-err'] 					= 'Please enter a valid email';
notices['email-syntax-err'] 				= 'Please enter a valid email';
notices['email-taken-err'] 					= 'This email is already registered';
notices['oldpass-empty-err'] 				= 'Please enter your current password';
notices['oldpass-wrong-err'] 				= 'Wrong password';
notices['newpass-empty-err'] 				= 'Please enter your new password';
notices['newpass-confirm-err'] 				= 'Please confirm your new password';
notices['pass-empty-err'] 					= 'Please enter a password with 6 or more characters';
notices['pass-short-err'] 					= 'Your password must be at least 6 characters long';
notices['yourpass-empty-err'] 				= 'Please enter your password';
notices['username-empty-err'] 				= 'Please enter your user name';
notices['username-syntax-err'] 				= 'The user name should be at least 5 characters long, using only letters, numbers and the "." and "_" symbols with no spaces.';
notices['username-taken-err'] 				= 'This user name is already taken';
notices['info_email_confirmed'] 			= 'Thank you for confirming your email address';
// BACK-END MESSAGES
// Invisible
notices['err_missing_param_token'] 			= 'Missing parameter: token';
notices['err_facebook_no_info'] 			= 'Problem getting data from Facebook';
notices['info_facebook_got_info'] 			= 'Successfully obtained information from Facebook';
notices['info_nop'] 						= 'Nothing to do';
notices['info_changes_saved'] 				= 'Your changes have been saved';
notices['info_conf_email_sent'] 			= 'Email address will be changed when confirmed. Confirmation email is sent.';
notices['info_changes_saved_conf_sent'] 	= 'Email address will be changed when confirmed. Confirmation email is sent.';
notices['info_welcome'] 					= 'Welcome to Edamam!';
notices['err_no_account'] 					= ['You don\'t seem to have an account with us. Please sign up!'];  
notices['err_ext_auth_failed'] 				= ['<span style="line-height:27px;">The link or redirect you used has expired. Please go <a id="param-url" href="">back to Validic</a> and click Connect again</span>'];

// Visible (top white line)
notices['err_cant_send_welcome'] 			= ['We couldn\'t send a Welcome email'];
notices['info_welcome_back'] 				= ['Your account has been re-activated'];
// Visible (inline orange warning)
notices['err_missing_email_addr'] 			= ['Missing email address'];
notices['err_invalid_email_addr'] 			= ['Invalid email address'];
notices['err_missing_password'] 			= ['Password is missing'];
notices['err_pass_too_short'] 				= ['New password is too short'];
notices['err_access_denied_sim_user'] 		= ['There is an existing user with this email but it\'s not connected to Facebook'];
notices['err_access_denied'] 				= ['Wrong e-mail or password - please try again!'];
notices['err_existing_account'] 			= ['The Facebook account you are trying to activate is taken by another user'];
notices['err_similar_account'] 		     	= ['There is no account with this Facebook, <br>but we have account with the same email'];
notices['err_fb_no_email']                  = ['There is no account with this Facebook <br>and no email address from Facebook'];
// Visible (popup with OK button)
notices['err_bad_token'] 					= ['Bad or expired token'];
notices['err_account_cant_save'] 			= ['Problem updating the account. Please try again later'];
notices['err_old_account_info'] 			= ['Concurrent changes'];
notices['err_conf_email_not_sent'] 			= ['Failed to send the confirmation email'];
notices['err_conf_not_sent_changes_saved'] 	= ['Failed to send the confirmation email'];

notices['msg_accounts'] 					= ['Accounts'];
notices['msg_logged_accounts_msg']			= ['You are logged into your account'];

function changeURL(){
	$('a').each(function() {
		
		var str 	= $(this).attr('href');
		var part 	= '',
			newURL 	= '';
		
		if(typeof(str) != "undefined"){
			var devURL = str.substring(0, 29);
			if(devURL == url['developer-url']){
				part = str.substr(29);
				newURL = devURL+url['temp-developer-url']+part;
			} else {
				if(str == 'javascript:void(0);'){
					newURL = str;
				} else if(str.substring(0, 4) != "http") {
					newURL = url['api-url']+str;
				} else if(str.substring(0, 6) == "mailto") {
					newURL = str;
				} else {
					newURL = str;
				}
			}
			$(this).attr('href', newURL);
		}
	});
}

function apiToken(){
	var params = {};
	headers = {
		'X-Edamam-AJAX'	: 'true'
	};
	$.ajax({
		type: 'POST',
		async: false,
		url: url['api-url']+'/account/token',
		headers: headers,
		data: params,
		success: function(response) {
			sessionStorage.setItem("expToken", response.expirationTime);
			sessionStorage.setItem("apiToken", response.token);
		}
	});	
}

function compareToken(){
	if(typeof(sessionStorage.apiToken) == "undefined"){
		apiToken();
	}
	var param = Math.floor((new Date(sessionStorage.expToken) - new Date(new Date().toISOString()))/1000/60);
	if(param < 3){
		apiToken();
	}
}

function loginMenu(param){
	$('body').addClass(param);
}

function init() {
	$.ajax({
		url: url['api-url']+'/api/account/get',
		xhrFields: {
			  withCredentials: true
		},
		type: 'POST',
		success: function(data) {

			sessionStorage.removeItem('expToken');
			sessionStorage.removeItem('apiToken');
			
			compareToken();

			if(data.firstName != null){
				if(data.lastName != null){
					userTitle = data.firstName+' '+data.lastName;
				} else {
					userTitle = data.firstName;
				}
			} else {
				userTitle = data.userName;
			}
			
			$.each(data.roles, function (i) {
				if(data.roles[i] === "chronicConditions"){
					edamamUser = "demo";
					return false
				}
			});
		
			userStatus 		= "logged";
			serviceStatus	= 'logged';

			loginMenu("logged");
		},
		error:	function(data) {
				loginMenu("notlogged");				
		},
		statusCode: {
			401: function() { //Unauthorized
				loginMenu("notlogged");
			},
			500: function() { //Bad request
				loginMenu("notlogged");
			}
		}
	});
}

function initServiceUser() {
	if(userStatus == "logged"){
		$('.profile-img').find('img').attr('src', '/assets/img/user.png');
		$('.profile-img').find('span').text(userTitle);

		$('.sidenav').find('.user').removeClass('d-none');
		$('.offcanvas-header').find('.profile-img').removeClass('d-none');

		$('.login').text(notices['msg_accounts']);
		$('#loginModal').find('#pills-service').html('');
		$('#login-service').removeClass('d-block').addClass('d-none');
		//$('.add-account').removeClass('d-block').addClass('d-none');
		$("#pills-service").load("/assets/html/forms/after-login-msg-service.html");
	}
}

function initApiUser() {
	if($.cookie('user_api_status') == "logged") {
		
		apiStatus = 'logged';

		$('.login').text(notices['msg_accounts']);
		$('#loginModal').find('#pills-api').html('');
		$('#login-api').removeClass('d-block').addClass('d-none');
		$('.add-account').removeClass('d-block').addClass('d-none');
		$('.logout-api').removeClass('d-none').addClass('d-block');
		$("#pills-api").load("/assets/html/forms/after-login-msg-api.html");

	}
}
	
/* ...... Modals Open ......*/
function openModal(target){	
	var myModal = new bootstrap.Modal(document.getElementById(target));
		myModal.show();
}
	
/* ...... Add Conversion ......*/
function recordConversion(){
    oImg = new Image();
    oImg.src="https://www.googleadservices.com/pagead/conversion/1002728966/?label=AaKvCPWoz1oQhtyR3gM&amp;guid=ON&amp;script=0";
    oImg.height=1;
    oImg.width=1;
    document.body.appendChild(oImg);
    return true;
}

/* ...... Add to MailChimp Service ......*/
function addMailChimp(service, email){

	if(service == '2357355820566'){ 
        //Nutrition Analysis API
        list = 'eb13dcc0a4';
    }
    if(service == '2357355820567'){ 
        //Recipe Search API
        list = '1e71aa6cba';
    }
    if(service == '2357355942325'){ 
        //Food Database API
        list = '38be731a18';
    }
		  
    $.ajax({
        url: url['api-url']+'/api/b2b/mail-list/members',
        type: 'POST', 
        data: {
            email	: email,
            list	: list
        },
        contentType: "application/x-www-form-urlencoded",
        success: function() {
            //console.log('success');
        },
        error: function() {
            //console.log('error');
        }
    });		
}

/* ...... Tooltip ......*/
function tooltipInit(){
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	  return new bootstrap.Tooltip(tooltipTriggerEl)
	})	
}

/* ...... API Form Validator ......*/
function validatorApiRegForm(target){
	$(target).bootstrapValidator({
		fields: {
			username: {
				message: 'The username is not valid',
				validators: {
					notEmpty: {
						message: 'The username is required'
					},
					stringLength: {
						min: 5,
						max: 30,
						message: 'The username must be more than 6 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9]+$/,
						message: 'The username can only consist of alphabetical and number'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required'
					},
					emailAddress: {
						message: 'The email address is not a valid'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required'
					},
					stringLength: {
						min: 6,
						message: 'The password must have at least 6 characters'
					},
					identical: {
						field: 'passwordconfirm',
						message: 'The password and its confirm are not the same'
					}							
				}
			},
			passwordconfirm: {
				validators: {
					notEmpty: {
						message: 'The password is required'
					},
					stringLength: {
						min: 6,
						message: 'The password must have at least 6 characters'
					},
					identical: {
						field: 'password',
						message: 'The password and its confirm are not the same'
					}							
				}
			},				
			orgname: {
				validators: {
					notEmpty: {
						message: 'The organization name is required'
					}
				}
			},					
			plans: {
				validators: {
					notEmpty: {
						message: 'You need to choose a plan'
					}
				}
			},					
			policy: {
				validators: {
					notEmpty: {
						message: 'Please agree with the Terms & Privacy Policy'
					}
				}
			},					
			card: {
				validators: {
					notEmpty: {
						message: 'Please agree to enter a Credit Card upon account creation'
					}
				}
			}
		}
	}).on('success.form.bv', function(){
		registerAPI(target);
    });	
}

/* ...... Service Form Validator ......*/
function validatorServiceRegForm(target){
	$(target).bootstrapValidator({
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required'
					},
					emailAddress: {
						message: 'The email address is not a valid'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required'
					},
					stringLength: {
						min: 6,
						message: 'The password must have at least 6 characters'
					},
					identical: {
						field: 'passwordconfirm',
						message: 'The password and its confirm are not the same'
					}							
				}
			},
			passwordconfirm: {
				validators: {
					notEmpty: {
						message: 'The password is required'
					},
					stringLength: {
						min: 6,
						message: 'The password must have at least 6 characters'
					},
					identical: {
						field: 'password',
						message: 'The password and its confirm are not the same'
					}							
				}
			},				
			policy: {
				validators: {
					notEmpty: {
						message: 'Please agree with the Terms & Privacy Policy'
					}
				}
			}
		}
	}).on('success.form.bv', function(){
		registerService(target);
    });	
}

/* ...... Register Service Account ......*/
function registerService(target){
	
	$(target).addClass("d-none");
	$('.signup-button').addClass("d-none");
	$('.loader').removeClass("d-none");
	
	var params, email, pass, headers;

	email = $(target).find('.input-email').val();
	pass = $(target).find('.input-password').val(); 
	
	params 	= {email: email, password: pass};
	headers = {
		'X-Edamam-AJAX': 'true'
	};
		
	$.ajax({
		type: 'POST',
		url: url['api-url']+'/api/account/add',
		headers: headers,
		data: params,
		success: function() {
			auth(target, email, pass);
		}
	}).error(function(response) {

		$(target).removeClass("d-none");
		$('.signup-button').removeClass("d-none");
		$('.loader').addClass("d-none");

		if(response.responseJSON.httpStatus == '403'){                        	
			var variable = '', s = response.responseJSON.message, match = s.split(', ');
			for (var a in match){
				variable += '<li>'+match[a]+'</li>';
			} 
			$(target).find(".err").addClass('has-error');
			$(target).find(".err").find('div.help-block').html('<ul class="list-unstyled">'+variable+'</ul>');
		}		
		
	});
	return false	
}

/* ...... Register API Account ......*/
function registerAPI(target){

	orgName = $(target).find('.input-orgname').val();
	userName = $(target).find('.input-username').val();
	email = $(target).find('.input-email').val();
	password = $(target).find('.input-password').val(); 

	if((applicationPlanId == '0')&&(servicePlanId == '0')){
		applicationPlanId = $.parseJSON($(target).find('.input-plans').val()).applicationPlanId;
		servicePlanId = $.parseJSON($(target).find('.input-plans').val()).servicePlanId;
	}
	
	$(target).addClass("d-none");
	$('.signup-button').addClass("d-none");
	$('.loader').removeClass("d-none");

	$.ajax({
		url: url['api-url']+'/api/b2b/account',
		headers: {'Origin': 'https://developer.edamam.com'},
		type: 'POST', 
		data: JSON.stringify({ 
			"orgInfo": {
				"orgName": orgName,
				"userName": userName,
				"email": email,
				"password": password
			},
			"creditCardInfo": {
				"token": "",
				"expYear": "",
				"expMonth": ""
			},
			"billingInfo": {
				"name": "",
				"address": "",
				"city": "",
				"country": ""
			},                    
			"plans": {
				"servicePlanId": servicePlanId,
				"applicationPlanId":  applicationPlanId
			}                              
		}),                          
		dataType:'JSON',
		contentType: "application/json; charset=UTF-8",
		success: function(data) {

			recordConversion();
			addMailChimp(servicePlanId, email);

			var modalID = 'signupAPIModal';
			
			$('.loader').addClass("d-none");
			$(target).removeClass("d-none");
			
			$('#'+modalID).modal('hide');
			openModal(modalID);
			$('#'+modalID).find("#signup-api-form").addClass("d-none");
			
			if((applicationPlanId == nutritionPlanId)||(applicationPlanId == recipePlanId)||(applicationPlanId == recipePlanId1)||(applicationPlanId == foodPlanId)||(applicationPlanId == foodPlanId1)||(applicationPlanId == mealPlanId)){
				$('#'+modalID).find('.page-title').text('Thank you!');
				$('#'+modalID).find('.title-line').next().text('To proceed, please enter your Credit Card details, after login');
			} else {
				$('#'+modalID).find('.page-title').text('Thank you!');
				$('#'+modalID).find('.title-line').next().text('To proceed, please log in to your account.');
			}						
			$('#'+modalID).find('.open-login-modal').removeClass('more').addClass('btn btn-green px-5');

		},
		error: function(data) {

			$(target).removeClass("d-none");
			$('.signup-button').removeClass("d-none");
			$('.loader').addClass("d-none");
			if(data.responseJSON.httpStatus == '422'){                        	
				var variable = '', s = data.responseJSON.param, match = s.split(', ');
				for (var a in match){
					variable += '<li>'+match[a]+'</li>';
				} 
				$(target).find(".err").addClass('has-error');
				$(target).find(".err").find('div.help-block').html('<ul class="list-unstyled">'+variable+'</ul>');
			}			
		}      
	});
}

/* ...... Login Form Validator ......*/
function validatorLoginForm(target, app){
	$(target).bootstrapValidator({
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required'
					},
					emailAddress: {
						message: 'The email address is not a valid'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required'
					},
					stringLength: {
						min: 3,
						message: 'The password must have at least 3 characters'
					}
				}
			}
		}
	}).on('success.form.bv', function(){
		login(target, app);
    });	
}

/* ...... Forgot Password ......*/
function forgotPass(email){
	$.ajax({
		type: 'POST',
		url: url['api-url']+'/api/password/send-reset-email',
		data: {email: email},
		xhrFields: {
			withCredentials: true
		},		
		success: function() {
			$('.loader').removeClass("d-block").addClass('d-none');
			$('#forgot-pass').find('.fs-6').html('Instructions for resetting your password have been sent to:<br><p>'+email+'</p>'); 
		}
	}).error(function(response) {

		$('#forgot-pass-form').removeClass("d-none").addClass("d-block");
		$('#forgot-pass').find('.modal-footer').removeClass("d-none").addClass("d-block");
		$('.loader').removeClass("d-block").addClass('d-none');

		if (response.status == "404") {
			$('#forgot-pass-form').find('.with-errors').text('There is no account associated with this e-mail.'); 
		} else {
			$('#forgot-pass-form').find('.with-errors').text('We\'re experiencing some problems. Please try again later.');
		}
	});
}

function auth(target, email, pass){
	var headers;
	var params = {};

	headers = {
		'Authorization'	: 'Basic ' + btoa(email + ':' + pass),
		'X-Edamam-AJAX'	: 'true',
	};
	
	$.ajax({
		type: 'POST',
		url: url['api-url']+'/api/account/authenticate',
		headers: headers,
		data: params,
		xhrFields: {
			withCredentials: true
		},
		success: function() {
			setTimeout(function () {
				window.location.reload();
			}, 500);
		}
	}).error(function(response) {
		
		$(target).removeClass("d-none");
		$('.login-button').removeClass("d-none");
		$('.loader').addClass("d-none");
		$('.bgr-tabs').removeClass("d-none");
		
		if (response && response.status == '401' && $.parseJSON(response.responseText).errorCode == 'err_unauthorized') {
			$('.tab-pane.active').append('<div class="err has-error mt-3"><div class="help-block with-errors text-center">'+notices['err_access_denied']+'</div></div>');			
		}
		
	});
	return false	
}

/* ...... Login Form ......*/
function login(target, app){

	$(target).addClass("d-none");
	$('.login-button').addClass("d-none");
	$('.loader').removeClass("d-none");
	$('.bgr-tabs').addClass("d-none");
	
	var email = $(target).find('.input-email').val();
	var pass = $(target).find('.input-password').val();
	
	if(app == 'api'){

		setTimeout(function () {
			$.cookie('tmp_user', email, { domain: 'edamam.com', path: '/' });
			$.cookie('tmp_pass', pass, { domain: 'edamam.com', path: '/' });
			$.cookie('tmp_urls', window.location.href, { domain: 'edamam.com', path: '/' });

			window.location.replace('https://developer.edamam.com/ui/login');
		}, 300);
		
	}else if(app == 'service'){

		auth(target, email, pass);

	}
}

/* ...... Forgot Form ......*/
function forgot(app){

	$('#forgot-pass-form').addClass("d-none");
	$('#forgot-pass').find('.modal-footer').addClass("d-none");
	$('.loader').removeClass("d-none");
	
	var email = $('#forgot-pass-form').find('.input-email').val();

	if(email != ''){	
		if(app == 'api'){

			setTimeout(function () {
				window.location.replace('https://developer.edamam.com/ui/forgot?email='+email);
			}, 300);
			
		}else if(app == 'service'){

			forgotPass(email);

		}
	} else {
		$('#forgot-pass-form').removeClass("d-none").addClass("d-block");
		$('#forgot-pass').find('.modal-footer').removeClass("d-none").addClass("d-block");
		$('.loader').removeClass("d-block").addClass('d-none');

		$('#forgot-pass-form').find('.with-errors').text('The email address is required');
	}
}

/* ...... Toggle Checkbox ......*/
function toggleCheckbox(target, value){
	var planID = $.parseJSON(value).applicationPlanId;
	if((planID == nutritionPlanId)||(planID == recipePlanId)||(planID == recipePlanId1)||(planID == foodPlanId)||(planID == foodPlanId1)||(planID == mealPlanId)){
		$(target).find('#cart-confirm').removeClass('d-none');
	} else {
		$(target).find('#cart-confirm').addClass('d-none');
	}
}

function signUpPlan(target){
	openModal('signupAPIModal');
}

function checkURL(){
	
	var mod = '',
		pid = '',
		sid = '';

	console.log(window.location.hash.slice(1).split('/')[2]);

	if(typeof(window.location.hash.slice(1).split('/')[2]) != "undefined"){
		mod = window.location.hash.slice(1).split('/')[0].split(':')[1];
		pid	= window.location.hash.slice(1).split('/')[1].split(':')[1]; 	
		sid	= window.location.hash.slice(1).split('/')[2].split(':')[1];
	} else {
		mod = window.location.hash.slice(1).split(':')[1];
	}
	
	if(typeof(mod) != "undefined"){
		if(mod == 'details'){
			openModal('signupAPIModal');
			
			if((typeof(pid) != "undefined")&&(typeof(sid) != "undefined")){
				
				if(pid == "1"){ //Client: API Layer
					
					$('.api-plans-modal').css('display', 'none');
					$('.api-plans-modal').closest('.col-md-6').prev('.col-md-6').addClass('col-md-12');
					$('.register-api-modal').find('#cart-confirm').removeClass('d-none');
						
					if(sid == '2357356337581'){	//API Layer Enterprise Pro
						
						$('.modal-header').find('.fs-6').text('').append('<b>Food Database API:</b> API Layer Enterprise Pro');
						applicationPlanId = "2357356337581";
						servicePlanId = "2357355942325";
					
					} else if(sid == '2357356337580'){	//API Layer Individual 
						
						$('.modal-header').find('.fs-6').text('').append('<b>Food Database API:</b> API Layer Individual');
						applicationPlanId = "2357356337580";
						servicePlanId = "2357355942325";					
					
					} else if(sid == '2357356337584'){	//API Layer Enterprise Pro
						
						$('.modal-header').find('.fs-6').text('').append('<b>Recipe Search API:</b> API Layer Enterprise Pro');
						applicationPlanId = "2357356337584";
						servicePlanId = "2357355820567";
					
					} else if(sid == '2357356337583'){	//API Layer Individual
						
						$('.modal-header').find('.fs-6').text('').append('<b>Recipe Search API:</b> API Layer Individual');
						applicationPlanId = "2357356337583";
						servicePlanId = "2357355820567";
					
					} else if(sid == '2357356337585'){	//API Layer Enterprise Pro
					
						$('.modal-header').find('.fs-6').text('').append('<b>Nutrition Analysis API:</b> API Layer Enterprise Pro');
						applicationPlanId = "2357356337585";
						servicePlanId = "2357355545991";
					
					} else if(sid == '2357356321500'){	//API Layer Individual
						
						$('.modal-header').find('.fs-6').text('').append('<b>Nutrition Analysis API:</b> API Layer Individual');
						applicationPlanId = "2357356321500";
						servicePlanId = "2357355545991";
						
					}
				}
			}
		} else if(mod == 'zendesk'){
			zE(function() {
				zE.activate();
			});
		} else if(mod == 'login'){
			openModal('loginModal');
			if(window.location.hash.indexOf('/') > -1){
				var err	= window.location.hash.slice(1).split('/')[1].split(':')[1]; 	
				var msg	= window.location.hash.slice(1).split('/')[2].split(':')[1];
				if((typeof(err) != "undefined")&&(typeof(msg) != "undefined")){
					if((err == "true")&&(msg == "pass")){
						$('#loginModal').find('.login-api').append('<div class="err has-error mt-3"><div class="help-block with-errors text-center">Wrong e-mail or password - please try again!</div></div>')
					}
				}
			}
		}
	}	
}


/* ............ Search Filters */
// Обновяване на лейбъла на филтрите
function filterLabelsStatus() {
	if ($.cookie("calCookie") || $.cookie("dietCookie") || $.cookie("allerCookie")) {
		var lbl;

		if ($.cookie("calCookie") && $.cookie("dietCookie") && $.cookie("allerCookie")) {

			if ($("#search-filter-groups ul li.selected").size() > 2) {
				lbl = $.cookie("calCookie").split("|")[0] + ", " + $.cookie("dietCookie").split("|")[0] + ", " + $.cookie("allerCookie").split("|")[0] + " ...";
			}
			else {
				lbl = $.cookie("calCookie") + ", " + $.cookie("dietCookie") + ", " + $.cookie("allerCookie");
			}

		}
		else {
			     if ($.cookie( "calCookie")) {var cookie = $.cookie( "calCookie");}
			else if ($.cookie("dietCookie")) {var cookie = $.cookie("dietCookie");}
			else if ($.cookie("allerCookie")) {var cookie = $.cookie("allerCookie");}
			
			if((cookie != 'null') && (cookie != '')){
				$("#filter-label .titles").text(cookie);
			}
			
			lbl = $("#filter-label .titles").text();
			if (lbl.split("|").length > 1) {
				lbl = lbl.split("|")[0] + " ...";
			}
		}
		$("#filter-label .titles").text(lbl);
	} else {
		if(edamamUser == "user"){
			$("#filter-label .titles").text("Calories, Diet, Ingredients");
		}else{
			$("#filter-label .titles").text("Chronic Conditions, Calories, Diet, Ingredients");
		}
	}

	if ($("#filter-label .lbl").text() == "Search refined by") {$("#filter-label .lbl").text("Refine search by")}

	//if ($.cookie("calCookie") || $.cookie("dietCookie") || $.cookie("allerCookie") || $.cookie("ccName") || $.cookie("ccValue")) {$("#filter").addClass("filter-on");}
	//else {$("#filter").removeClass("filter-on");}

}


// Стартиране на проверка на филтрите при зареждане на страницата
function startupFiltersStatus() {
	var filter, cookie;

	function filterAction(filter, cookie) {
		filter.find("ul li").each(function() {
			if ($.cookie(cookie).indexOf($(this).find("label").text()) != -1) {
				$(this).addClass("selected").find("input").attr("checked", "checked");
			}
		});
	}

	if ($.cookie("calCookie") && $.cookie("dietCookie") && $.cookie("allerCookie")) {
		filterAction($("#search-filter-cals"),  "calCookie");
		filterAction($("#search-filter-diet"), "dietCookie");
		filterAction($("#search-filter-allergies"), "allerCookie");
	}
	else {
		if ($.cookie( "calCookie")) {filterAction($("#search-filter-cals"),  "calCookie");}
		if ($.cookie("dietCookie")) {filterAction($("#search-filter-diet"), "dietCookie");}
		if ($.cookie("allerCookie")) {filterAction($("#search-filter-allergies"), "allerCookie");}
	}

	if ($.cookie("ccName")||$.cookie("ccValue")||$.cookie("calFromValue")||$.cookie("calToValue")||$.cookie("ingUpToValue")) {
		  
		$('#cal-from').val($.cookie("calFromValue"));
		$('#cal-to').val($.cookie("calToValue"));
		$('#ing-upto').val($.cookie("ingUpToValue"));

		$(".ccName > option").each(function() {
			if (this.value == $.cookie("ccName")){
				$(this).attr("selected", "selected");
			}
		});
		
		$(".ccValue > option").each(function() {
			if (this.value == $.cookie("ccValue")){
				$(this).attr("selected", "selected");
			}
		});
		
	}	
	filterLabelsStatus(); // Задейства обновяване на лейбъла на дадения филтър
	filterButtonStatus(); // Задейства обновяване статуса на бутона за изчистване на филтрите

}
// Обновяване статуса на филтрите
function filterButtonStatus() {
	var btn = $("#search-filter-actions .clear-selection");
	if ($.cookie("calCookie")||$.cookie("dietCookie")||$.cookie("allerCookie")||$.cookie("ccName")||$.cookie("ccValue")||$.cookie("calFromValue")||$.cookie("calToValue")||$.cookie("ingUpToValue")) {
		$("#set-filters").removeClass("close").addClass("search");
		$("#set-filters").text("Find");
		btn.show();
	} else {
		$("#set-filters").removeClass("search").addClass("close");
		$("#set-filters").text("Done");
		btn.hide();
	}
}
// Анулиране на избрани филтри
function clearFilter() {
	if ($.cookie("calCookie")) {$.removeCookie("calCookie", { path: '/' });}
	if ($.cookie("dietCookie")) {$.removeCookie("dietCookie", { path: '/' });}
	if ($.cookie("allerCookie")) {$.removeCookie("allerCookie", { path: '/' });}
	if ($.cookie("calFromValue")) {$.removeCookie("calFromValue", { path: '/' });}
	if ($.cookie("calToValue")) {$.removeCookie("calToValue", { path: '/' });}
	if ($.cookie("ingUpToValue")) {$.removeCookie("ingUpToValue", { path: '/' });}
	if ($.cookie("ccName")) {$.removeCookie("ccName", { path: '/' });}
	if ($.cookie("ccValue")) {$.removeCookie("ccValue", { path: '/' });}

	$('#cal-from').val('');
	$('#cal-to').val(''); 
	$('#ing-upto').val('');	

	$(".ccName > option").each(function() {
		$(this).removeAttr("selected");
	});
	
	$(".ccValue > option").each(function() {
		$(this).removeAttr("selected");
	});

	$("#search-filter-groups ul li").removeClass("selected").find("input").removeAttr("checked");

	if ($("#filter-label .lbl").text() == "Search refined by") {
		$("#filter-label .lbl").text("Refine search by");
	}
	
	filterButtonStatus(); //Задейства обновяване статуса на филтрите
}
// Обновява статуса на кукитата
function filterCookieStatus(){
	var newCal,
	calFrom = parseInt($('#cal-from').val()),
	calTo 	= parseInt($('#cal-to').val()),
	ingUpTo = parseInt($('#ing-upto').val());	
	
	calFrom = (isNaN(calFrom)) ? '' : calFrom;
	calTo	= (isNaN(calTo)) ? '' : calTo;
	ingUpTo	= (isNaN(ingUpTo)) ? '' : ingUpTo;
	
	if((calFrom != '')&&(calTo != '')){
		if(calFrom > calTo){
			calFrom = $('#cal-to').val();
			calTo	= $('#cal-from').val();
		}	
	}
	
	$.cookie("calFromValue", calFrom, {path: '/'});
	$.cookie("calToValue", calTo, {path: '/'});
	$.cookie("ingUpToValue", ingUpTo, {path: '/'});
	
	$.cookie("ccName", $(".ccName").find('option:selected').val(), {path: '/'});
	$.cookie("ccValue", $(".ccValue").find('option:selected').val(), {path: '/'});	
	
	if(calFrom == ''){
		newCal = calTo;
		$.cookie("calCookie", 'Under '+ calTo+' cal/serv', {path: '/'});
	} else if(calTo == '') {
		newCal = calFrom+'-';
		$.cookie("calCookie", 'Over '+ calFrom+' cal/serv', {path: '/'});
	} else {
		newCal = calFrom+'-'+calTo;
		$.cookie("calCookie", newCal+' cal/serv', {path: '/'});
	}

	if((calFrom == '')&&(calTo == '')){
		if(ingUpTo != ''){
		  $.cookie("calCookie", 'Up to '+ ingUpTo+' ingredients', {path: '/'});
		} else {
		  $.removeCookie("calCookie", {path: '/'});
		  //$.cookie( "calCookie", null, {path: '/'});
		}
	}

	$('#calories-input').val(newCal);
	filterButtonStatus(); //Задейства обновяване статуса на филтрите
}

/* Чертае donut графиката */
function DonutChart(parent, spec) {

    var __polar2xy = function(a, r) {
	return {
	    x:  Math.cos(a * 2 * Math.PI) * r,
	    y: -Math.sin(a * 2 * Math.PI) * r,
	}
    }

    var __gen_arc_path = function(cx, cy, r, start, offset) {
	var end = __polar2xy(start + offset, r)
	start = __polar2xy(start, r)
	return [
	    "M", cx + start.x, cy + start.y,
	    "A", r, r, 0, +(offset > .5), 0, cx + end.x, cy + end.y,
	].join(" ")
    }

    var __gen_chart_item = function(out, c, r, prev, cur, i, stroke) {
	out.push(["path", {
	    d: __gen_arc_path(c, c, r, prev, cur),
	    class: "food-chart-item-" + i,
	    fill: "transparent",
	    "stroke-width": stroke,
	}])
    }

    var __gen_chart = function(chart) {
	var prev = 0, out = []
	// FIXME get radius and stroke-width from CSS
	var c = chart.r, r = chart.r - chart.stroke / 2
	for (var i in chart.items) {
	    cur = chart.items[i]
	    __gen_chart_item(out, c, r, prev, cur.value, i, chart.stroke)
	    prev += cur.value
	}
	if (prev < 1) {
	    __gen_chart_item(out, c, r, prev, 1 - prev, "bg", chart.stroke)
	}
	return out
    }

    var __create_tag_tree = function(elem) {
	var root = document.createElementNS("http://www.w3.org/2000/svg", elem[0])
	var attr = elem[1]
	// Set attributes
	for (var i in attr) {
	    var a = document.createAttribute(i)
	    a.value = attr[i]
	    root.setAttributeNode(a)
	}
	// Create children nodes
	if (elem.length > 2) {
	    var children = elem[2]
	    for (var i in children) {
		var c = __create_tag_tree(children[i])
		root.appendChild(c)
	    }
	}
	return root
    }


    /* Transformation matrix (rotate and mirror) to correct orientation:
     * \[
     *   \left[
     *   \begin{array}{ccc}
     *      0 & -1 & 0 \\
     *     -1 &  0 & 0 \\
     *      0 &  0 & 1
     *   \end{array}
     *   \right]
     * \]
     */
    var correct_orientation = "matrix(0 -1 -1 0 0 0)"

    var __gen_code = function(spec) {
	return __create_tag_tree(
	    ["svg", {
		transform: correct_orientation,
		class: "chart-donut",
		width: spec.r * 2,
		height: spec.r * 2,
	    }, __gen_chart(spec)])
    }

    var __is_dict = function(v) {
	return v && typeof v === "object" && !(v instanceof Array)
    }

    DonutChart.prototype.update = function(spec) {
	// Merge the new spec
	for (var i in spec) {
	    this.spec[i] = spec[i]
	}

	var code = __gen_code(this.spec)
	// TODO can we switch the elements in place?
	if (this.element != undefined) {
	    this.element.remove()
	}
	this.element = this.parent.appendChild(code)
    }

    this.parent = parent
    this.spec = spec
    this.update({})
}

/* ...... jQuery Document Ready ......*/
jQuery(document).ready(function() {

	init();

	$(document).one("ajaxStop", function() {
		initServiceUser();
		initApiUser();
		changeURL();
		checkURL();
	});
		
	/* ...... Init Page ......*/
	$("header").load("/assets/html/header.html");
	$("footer").load("/assets/html/footer.html");
	$("#offcanvas").load("/assets/html/sidenav.html");

	/* ...... Map pages ......*/
	if ($("body").hasClass("home-page")) {
		
		//$("main").load(url['developer-url']+'ui/home.html', function() {
		$("main").load("/assets/html/pages/home.html", function() {
			$("#get-started-form").load("/assets/html/forms/signup-api.html", function() {
				$("#get-started-form").find('form').addClass('register-api-home');
				$("#get-started-form").find('.input-plans').addClass('api-plans-home');
				validatorApiRegForm('.register-api-home');
			});			
			/* ...... Partners Logo Carousel ......*/
			$('.customer-logos').slick({
				slidesToShow: 10,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 1500,
				arrows: false,
				dots: false,
				pauseOnHover: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 4
					}
				}, {
					breakpoint: 520,
					settings: {
						slidesToShow: 3
					}
				}]
			});
		});
		/* ...... Go to Get Started ......*/
		$(document).on('click', '.get-started', function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $("#started").offset().top - 60
			}, 600);
			return false;
		});
		$(document).on('change', '.api-plans-home', function() {
			toggleCheckbox('.register-api-home', this.value);
		});
	} else {
		/* ...... Signup API Modal ......*/
		$(document).on('click', '.get-started', function(event) {
			event.preventDefault();
			openModal('signupAPIModal');
			return false;
		});			
	}
	if ($("body").hasClass("partners-page")) {
		
		/* ...... Suggestic Partner Page......*/
		if($("body").hasClass("suggestic")){
			$("main").load("/assets/html/pages/partners/suggestic.html");
		/* ...... Personal Remedies Partner Page......*/		
		} else if($("body").hasClass("personal-remedies")){
			$("main").load("/assets/html/pages/partners/personal-remedies.html");
		/* ...... MealMe Partner Page......*/		
		} else if($("body").hasClass("mealme")){
			$("main").load("/assets/html/pages/partners/meal-me.html");
		/* ...... Sifter Partner Page......*/		
		} else if($("body").hasClass("sifter")){
			$("main").load("/assets/html/pages/partners/sifter.html");
		/* ...... Sommify Partner Page......*/		
		} else if($("body").hasClass("sommify")){
		$("main").load("/assets/html/pages/partners/sommify.html");
		/* ...... Partners Home Page......*/	
		} else {
			$("main").load("/assets/html/pages/partners.html");	
		} 
		
	}
	if ($("body").hasClass("privacy-page")) {
		$("main").load("/assets/html/pages/privacy.html");	
	}	
	if ($("body").hasClass("terms-page")) {
		$("main").load("/assets/html/pages/terms.html");	
	}
	if ($("body").hasClass("terms-page-api")) {
		$("main").load("/assets/html/pages/api/terms.html");
	}	
	if ($("body").hasClass("company-page")) {
		$("main").load("/assets/html/pages/company.html");	
	}
	if ($("body").hasClass("media-page")) {
		$("main").load("/assets/html/pages/media.html");	
	}
	if ($("body").hasClass("pregnancy-page")) {
		$("main").load("/assets/html/pages/pregnancy.html");	
	}
	if ($("body").hasClass("ai-page")) {
		$("main").load("/assets/html/pages/ai.html");	
	}	
	if ($("body").hasClass("foods-page")) {
		$("main").load("/assets/html/pages/foods.html");
	}
	if ($("body").hasClass("food-page")) {
		$("main").load("/assets/html/pages/food.html");	
	}	
	if ($("body").hasClass("search-page")) {
		$("main").load("/assets/html/pages/search-page.html");	
	}	
	if ($("body").hasClass("api")) {
	//Recipe Search API
		if ($(".bgr-home").hasClass("recipe-api")) {
			//$("main").load("/assets/html/pages/api/recipe.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").addClass("selected");

					$(document).on('click', '.sing-dev', function(event) {
						event.preventDefault();
						signUpPlan('searchDeveloper');
						return false;
					});					
					$(document).on('click', '.sing-core', function(event) {
						event.preventDefault();
						signUpPlan('searchCore');
						return false;
					});

				});
				tooltipInit();
			//});
	//Food Database API
		} else if ($(".bgr-home").hasClass("food-api")) {
			//$("main").load("/assets/html/pages/api/food.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-food-database-url']).addClass("selected");
					$("#api-demo").prop("href", url['api-demo-food-database-url']);
					$("#api-doc").prop("href", url['api-docs-food-database-url']);

					$(document).on('click', '.sing-dev', function(event) {
						event.preventDefault();
						signUpPlan('databaseDeveloper');
						return false;
					});					
					$(document).on('click', '.sing-core', function(event) {
						event.preventDefault();
						signUpPlan('databaseCore');
						return false;
					});
					
				});
				tooltipInit();
			//});
	//Nutrition Analysis API
		} else if ($(".bgr-home").hasClass("nutrition-api")) {
			//$("main").load("/assets/html/pages/api/nutrition.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-nutrition-url']).addClass("selected");
					$("#api-demo").prop("href", url['api-demo-nutrition-url']);
					$("#api-doc").prop("href", url['api-docs-nutrition-url']);

					$(document).on('click', '.sing-dev', function(event) {
						event.preventDefault();
						signUpPlan('nutritionDeveloper');
						return false;
					});					
					$(document).on('click', '.sing-core', function(event) {
						event.preventDefault();
						signUpPlan('nutritionCore');
						return false;
					});

				});
				tooltipInit();
			//});
	//Recipe Search API Doc
		} else if ($(".bgr-home").hasClass("recipe-api-doc")) {
			//$("main").load("/assets/html/pages/api/recipe-doc.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-recipe-url']);
					$("#api-demo").prop("href", url['api-demo-recipe-url']);
					$("#api-doc").prop("href", url['api-docs-recipe-url']).addClass("selected");
				});
			//});
	//Food Database API Doc
		} else if ($(".bgr-home").hasClass("food-api-doc")) {
			//$("main").load("/assets/html/pages/api/food-doc.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-food-database-url']);
					$("#api-demo").prop("href", url['api-demo-food-database-url']);
					$("#api-doc").prop("href", url['api-docs-food-database-url']).addClass("selected");
				});
			//});	
	//Nutrition Analysis API Doc
		} else if ($(".bgr-home").hasClass("nutrition-api-doc")) {
			//$("main").load("/assets/html/pages/api/nutrition-doc.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-nutrition-url']);
					$("#api-demo").prop("href", url['api-demo-nutrition-url']);
					$("#api-doc").prop("href", url['api-docs-nutrition-url']).addClass("selected");
				});
			//});
	//Recipe Search API Demo
		} else if ($(".bgr-home").hasClass("recipe-api-demo")) {
			//$("main").load("/assets/html/pages/api/recipe-demo.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-recipe-url']);
					$("#api-demo").prop("href", url['api-demo-recipe-url']).addClass("selected");
					$("#api-doc").prop("href", url['api-docs-recipe-url']);
				});
			//});
	//Food Database API Demo
		} else if ($(".bgr-home").hasClass("food-api-demo")) {
			//$("main").load("/assets/html/pages/api/food-demo.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-food-database-url']);
					$("#api-demo").prop("href", url['api-demo-food-database-url']).addClass("selected");
					$("#api-doc").prop("href", url['api-docs-food-database-url']);
				});
			//});	
	//Nutrition Analysis API Demo
		} else if ($(".bgr-home").hasClass("nutrition-api-demo")) {
			//$("main").load("/assets/html/pages/api/nutrition-demo.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$("#api-price").prop("href", url['api-nutrition-url']);
					$("#api-demo").prop("href", url['api-demo-nutrition-url']).addClass("selected");
					$("#api-doc").prop("href", url['api-docs-nutrition-url']);
				});
			//});	
	//API Calorie counting Usecase
		} else if ($(".bgr-home").hasClass("cases-calorie-counting")) {
			//$("main").load("/assets/html/pages/api/cases-calorie-counting.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-cases').addClass("selected");
				});
			//});
	//API Meal plans Usecase
		} else if ($(".bgr-home").hasClass("cases-meal-plans")) {
			//$("main").load("/assets/html/pages/api/cases-meal-plans.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-cases').addClass("selected");
				});
			//});
	//API Recipe nutrition Usecase
		} else if ($(".bgr-home").hasClass("cases-recipe-nutrition")) {
			//$("main").load("/assets/html/pages/api/cases-recipe-nutrition.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-cases').addClass("selected");
				});
			//});
	//API Food recipe licensing Usecase
		} else if ($(".bgr-home").hasClass("cases-food-recipe-licensing")) {
			//$("main").load("/assets/html/pages/api/cases-food-recipe-licensing.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-cases').addClass("selected");
				});
			//});
		} else if ($(".bgr-home").hasClass("api-faq-page")) {
			//$("main").load("/assets/html/pages/api/faq.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-faq').addClass("selected");
				});
			//});
		} else if ($(".bgr-home").hasClass("api-attr-page")) {
			//$("main").load("/assets/html/pages/api/attribution.html", function() {
				$(".sub").load("/assets/html/subnav.html", function() {
					$('#api-attr').addClass("selected");
				});
			//});
		}
	}

	/* ...... Modals Close ......*/
	$('.modal').on('show.bs.modal', function () {
		$('.modal').not($(this)).each(function () {
			$('.loader').addClass("d-none");
			$(this).modal('hide');
		});
	});
	
	/* ...... Login Modal ......*/
	$("#loginModal").load("/assets/html/modals/login.html", function() {
		
		$(document).one("ajaxStop", function() {
			initServiceUser();
			initApiUser();
		});

		validatorLoginForm('.login-api', 'api');
		validatorLoginForm('.login-service', 'service');

		$(document).on('click', '#labels', function(event) {
			event.preventDefault();
			openModal('labelsModal');
			return false;
		});		
		$(document).on('click', '.login', function(event) {
			event.preventDefault();
			openModal('loginModal');
			return false;
		});
		$(document).on('click', '#login-api', function(event) {
			event.preventDefault();
			//validatorLoginForm('.login-api', 'api');
			$('.login-api').submit();
			return false;
		});
		$(document).on('click', '#login-service', function(event) {
			event.preventDefault();
			//validatorLoginForm('.login-service', 'service');
			$('.login-service').submit();
			return false;
		});
		
		/* ...... Swap Modal Forms ......*/
		$(document).on('click', '.open-login-modal', function(event) {
			event.preventDefault();
			openModal('loginModal');
			return false;
		});
		$(document).on('click', '#pills-api-tab', function(event) {
			event.preventDefault();
			$('#create-account').removeClass('create-account-service').addClass('create-account-api');
			$('.logout-service').removeClass('d-block').addClass('d-none');
			if(apiStatus == 'logged'){
				$('#login-service').removeClass('d-block').addClass('d-none');
				$('.add-account').removeClass('d-block').addClass('d-none');
				$('.logout-api').removeClass('d-none').addClass('d-block');
			} else {
				$('#login-service').removeClass('d-none').addClass('d-block');
				$('.add-account').removeClass('d-none').addClass('d-block');
				$('.logout-api').removeClass('d-block').addClass('d-none');
			}
			$('#login-service').prop('id', 'login-api');
			return false;
		});
		$(document).on('click', '#pills-service-tab', function(event) {
			event.preventDefault();
			$('#create-account').removeClass('create-account-api').addClass('create-account-service');
			$('.logout-api').removeClass('d-block').addClass('d-none');
			if(serviceStatus == 'logged'){
				$('#login-api').removeClass('d-block').addClass('d-none');
				$('.add-account').removeClass('d-block').addClass('d-none');
				$('.logout-service').removeClass('d-none').addClass('d-block');
			} else {
				$('#login-api').removeClass('d-none').addClass('d-block');
				$('.add-account').removeClass('d-none').addClass('d-block');
				$('.logout-service').removeClass('d-block').addClass('d-none');
			}
			$('#login-api').prop('id', 'login-service');
			return false;
		});

	});

	/* ...... Signup API Modal ......*/
	$("#signupAPIModal").load("/assets/html/modals/signup-api.html", function() {
		$("#signup-api-form").load("/assets/html/forms/signup-api.html", function() {
			
			$("#signup-api-form").find('form').addClass('register-api-modal');
			$("#signup-api-form").find('.input-plans').addClass('api-plans-modal');
			validatorApiRegForm('.register-api-modal');
			
			$(document).on('click', '.create-account-api', function(event) {
				event.preventDefault();	
				openModal('signupAPIModal');
				return false;
			});
			$(document).on('click', '#signup-api', function(event) {
				event.preventDefault();
				$('.register-api-modal').submit();
				return false;
			});
			$(document).on('click', '#signup-api-home', function(event) {
				event.preventDefault();
				$('.register-api-home').submit();
				return false;
			});		
			$(document).on('change', '.api-plans-modal', function(event) {
				event.preventDefault();
				toggleCheckbox('.register-api-modal', this.value);
				return false;
			});
	
		});
	});
	
	/* ...... Signup Service Modal ......*/
	$("#signupServiceModal").load("/assets/html/modals/signup-service.html", function() {
		$("#signup-service-form").load("/assets/html/forms/signup-service.html", function() {
			
			validatorServiceRegForm('.register-service-modal');
			
			$(document).on('click', '.create-account-service', function(event) {
				event.preventDefault();
				openModal('signupServiceModal');
				return false;
			});
			$(document).on('click', '#signup-service', function(event) {
				event.preventDefault();
				$('.register-service-modal').submit();
				return false;
			});
			
		});
	});		

	/* ...... Forgot Password Modal ......*/
	$("#forgotModal").load("/assets/html/modals/forgot.html", function() {

		$(document).on('focus', '#forgot-pass-form input:text', function () {
			$('#forgot-pass-form').find('.with-errors').text('');
		});

		/* ...... Forgot Password Modal API ......*/
		$(document).on('click', '.forgot-pass-api', function(event) {
			event.preventDefault();
			$('#forgot-pass-form').addClass('forgot-api').removeClass('forgot-service');
			$('.forgot-button').prop('id', 'forgot-pass-api');
			openModal('forgotModal');
			return false;
		});
		/* ...... Forgot Password Modal Service ......*/
		$(document).on('click', '.forgot-pass-service', function(event) {
			event.preventDefault();
			$('#forgot-pass-form').addClass('forgot-service').removeClass('forgot-api');
			$('.forgot-button').prop('id', 'forgot-pass-service');
			openModal('forgotModal');
			return false;
		});
		$(document).on('click', '#forgot-pass-api', function(event) {
			event.preventDefault();
			forgot('api');
			return false;
		});
		$(document).on('click', '#forgot-pass-service', function(event) {
			event.preventDefault();
			forgot('service');
			return false;
		});

	});

	/* ...... Labels Modal ......*/
	$("#labelsModal").load("/assets/html/modals/labels.html", function() {

		startupFiltersStatus();

		// Анулиране на избраните филтри
		$(document).on('click', '.clear-selection', function(event) {
			event.preventDefault();
			clearFilter();
			return false;
		});

		// Блок от действия при управление на филтрите за търсене
		$(document).on('click', '#search-filter-groups .filter-group ul li', function(event) {
			event.preventDefault();

			// Деклариране на генерални променливи
			var cookie, filter = $(this).closest(".filter-group");

			// Общ блок от действия при промяна на даден филтър
			if (!$(this).hasClass("selected")) {
				$(this).addClass("selected");
				$(this).find("input").attr("checked", "checked");
			} else {
				$(this).removeClass("selected");
				$(this).find("input").removeAttr("checked");
			}

				 if (filter.attr("id") == "search-filter-cals") 	 {cookie = "calCookie";}
			else if (filter.attr("id") == "search-filter-diet") 	 {cookie = "dietCookie";}
			else if (filter.attr("id") == "search-filter-allergies") {cookie = "allerCookie";}

			$.removeCookie(cookie, { path: '/' }); // Анулира актуалната бисквитка на дадения филтър

			if (filter.find("ul li.selected").length) { // Създава нова бисквитка съхраняваща избора на дадения филтър
				var tagsLst = "";
				filter.find("ul li.selected").each(function() {
					if (tagsLst == "") {tagsLst = $(this).find("label").text();}
					else {
						if (tagsLst.indexOf($(this).find("label").text()) == -1) {
							tagsLst = tagsLst + " | " + $(this).find("label").text();
						}
					}
				});
				$.cookie(cookie, tagsLst, {path: '/', expires: 30});
			}

			filterButtonStatus(); // Задейства обновяване статуса на филтрите
			return false;
		});

		$(document).on('click', '.btn.search', function(event) {
			event.preventDefault();
			var qsearch = $(".input-search").val();
			filterCookieStatus();
			if ($.cookie("calCookie")||$.cookie("dietCookie")||$.cookie("allerCookie")||$.cookie("ccName")||$.cookie("ccValue")||$.cookie("calFromValue")||$.cookie("calToValue")||$.cookie("ingUpToValue")||qsearch !='') {
				window.location.href = '/results/recipes/?search='+qsearch;
			}
			return false;
		});

		$(document).on('keypress', '.input-search', function(e) {
			var key = e.which;
			if(key === 13){
				$('.btn.search').click();
				return false;
			}
		});

		$(document).on('keyup', '#search-filter-cals input', function(event) {
			event.preventDefault();
			filterCookieStatus();
			return false;
		});

		$(document).on('change', '.sel-rem', function(event) {
			event.preventDefault();
			filterCookieStatus();
			return false;
		});

		$(document).on('click', '.btn.close', function(event) {
			event.preventDefault();
			$('#labelsModal').modal('hide');
			return false;
		});

		$('#labelsModal').on('hide.bs.modal', function () {
			filterLabelsStatus();
		});		
	});	
});	