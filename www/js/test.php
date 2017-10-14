
<?php 
$key=$_POST['key'];
$txnid=$_POST['txnid'];
$amount=$_POST['amount'];
$productinfo=$_POST['productinfo'];
$firstname=$_POST['firstname'];
$email=$POST['email'];
$phone=$_POST['phone'];


?>
<html>
    <body onload="document.getElementById('redirectForm').submit()"></body>
<form name="payuForm" id="payuForm" action="https://secure.payu.in/_payment" method="post">
<input type="hidden" name="key" value="38e9tU45">
<input type="hidden" name="txnid" value="123456">
<input type="hidden" name="amount" value="10">
<input type="hidden" name="productinfo" value="">
<input type="hidden" name="firstname" value="'<?php echo $firstname ?>'">
<input type="hidden" name="email" value="'<?php echo $email ; ?>'">
<input type="hidden" name="phone" value="'<?php echo $phone ;?>'">
<input  type="hidden" name="surl" value="https://payu.herokuapp.com/success" />
<input type="hidden" name="Furl" value="https://payu.herokuapp.com/failure" />
<input id="Hash" type="hidden" name="Hash" value="5cc50c4cefdb069e0a43963ec55000964fddbb65010428aca27c107b1824ef02805a587fd3bfc4c0bdf5850e0644731bf98e265abc3f8da72383814e86db0"/>
<input type="submit" value="enter" style="position: absolute; left: -9999px"/>


</form>
</html>
/*<script type="text/javascript">
	
    
        	document.payuForm.submit();

</script>*/
