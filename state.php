<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Paymob</title>
</head>
<body>
    <?php 
        // $data = json_decode(file_get_contents('php://input'));
        $data = file_get_contents('php://input');
        $json = json_decode($data);

        $amount_cents = $json->obj->amount_cents;                       // database
        $created_at = $json->obj->order->created_at;
        $currency = $json->obj->currency;                               // database
        $error_occured = $json->obj->error_occured;
        $has_parent_transaction = $json->obj->has_parent_transaction;
        $transaction_id = $json->obj->id;                               // database
        $integration_id = $json->obj->integration_id;
        $is_3d_secure = $json->obj->is_3d_secure;
        $is_auth = $json->obj->is_auth;
        $is_capture = $json->obj->is_capture;
        $is_refunded = $json->obj->is_refunded; 
        $is_standalone_payment = $json->obj->is_standalone_payment;
        $is_voided = $json->obj->is_voided;
        $order_id = $json->obj->order->id;                              // database
        $owner = $json->obj->owner;
        $pending = $json->obj->pending;                                 // database
        $source_data_pan = $json->obj->source_data->pan;
        $source_data_sub_type = $json->obj->source_data->type;
        $source_data_type = $json->obj->source_data->sub_type;
        $success = $json->obj->success;                                 // database

        $hmac = $json->obj->data->secure_hash;    // hmac
        $request_string = $amount_cents.$created_at.$currency.$error_occured.$has_parent_transaction.$transaction_id.$integration_id.$is_3d_secure.$is_auth.$is_capture.$is_refunded.$is_standalone_payment.$is_voided.$order_id.$owner.$pending.$source_data_pan.$source_data_sub_type.$source_data_type.$success;
        $hashed = hash_hmac('SHA512', $request_string, '0A7BCC014DDBD3DFF399ACB17229B4CD');
        echo $request_string . '</br></br>' . $hashed . '</br></br>' . $hmac;

        // $secure_hash = $json->obj->data->secure_hash;    // hmac

        // if ($hmac == $hashed) {
        //     // store in database
        // }else {
        //     // echo 'erorr';
        // }
    ?>

    <!-- https://docs.paymob.com/docs/accept-standard-redirect -->
    <!-- paymob api flow -->
    <script src="script.js"></script>
</body>
</html>