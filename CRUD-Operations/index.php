<html>
<head>
	<title>PHP - CRUD </title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.3.1/jquery.twbsPagination.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.5/validator.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css">

	<script type="text/javascript">
    	 var url = "http://localhost/CRUD-Operations/";
        </script>
        <script src="form.js"></script>
</head>
    <body>
    <div class="container">
		<div class="row">
		    <div class="col-lg-12 margin-tb">					
		        <div class="pull-left">
		            <h2>PHP - CRUD </h2>
		        </div>
		    </div>
		</div>
		<div>
			<form  id="create-item" data-toggle="validator" action="create.php" method="POST">
					<div class="form-group">
						<label class="control-label" for="pname">Name:</label>
						<input type="text" name="pname" class="form-control" data-error="Please enter Name." required />
						<div class="help-block with-errors"></div>
					</div>
					<div class="form-group">
						<label class="control-label" for="code">Skew:</label>
						<input type="text" name="code" class="form-control" data-error="Please enter Skew." required />
						<div class="help-block with-errors"></div>
					</div>
					<div class="form-group">
						<label class="control-label" for="price">Price:</label>
						<input type="text" name="price" class="form-control" data-error="Please enter Price." required />
						<div class="help-block with-errors"></div>
					</div>
					<div class="form-group">
						<label class="control-label" for="quantity">Quantity:</label>
						<input type="text" name="quantity" class="form-control" data-error="Please enter Quantity." required />
						<div class="help-block with-errors"></div>
					</div>
					<div class="form-group">
						<button type="submit" class="btn crud-submit btn-success">Submit</button>
					</div>
				</form>
			</div>
			<table class="table table-bordered">
				<thead>
					<tr>
					<th>Name</th>
					<th>Code</th>
					<th>Price</th>
					<th>Quantity</th>
					<th width="200px">Action</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
    </body>
</html>

