<?php
    // require("./citas/RestFull.php")
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- FullCalendar CSS -->
    <!-- <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script> -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar-scheduler@6.1.15/index.global.min.js'></script>
    <link href='public/css/calendario.css?nessw' rel='stylesheet' />
    <!-- <script src='https://cdn.jsdelivr.net/npm/fullcalendar-scheduler@6.1.15/index.global.min.js'></script> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- Incluir Moment.js Locales desde CDNJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/locale/es.min.js"  crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <title>Citas medicas</title>
</head>

<body>
    <header>
        <section class="container">
            <img src="" alt="">
            <aside><h2>App de agendamiento de citas</h2></aside>
        </section>
    </header>
    <main >
        <section id="main" class="mt-4 mb-4"></section>
        <section id="pacientes" class="mt-4 mb-4"></section>

    </main>
    <footer>
        <section class="container">
            <p>
                Desarrollado por Luis Barrolleta
            </p>
        </section>
    </footer>
    <!-- <div class="alert alert-success" role="alert">
        A simple success alert—check it out!
    </div> -->
    <div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts">
        <div class="toast-container position-fixed p-3 top-0 start-50 translate-middle-x" id="toastPlacement"></div>
    </div>
    
    <?php
// $restFull = new RestFull;
// phpinfo();

?>

    <script type="module" src="public/javascript.js?ramdon=90ss0"></script>
    <script src=" https://cdn.jsdelivr.net/npm/luxon@3.5.0/build/global/luxon.min.js "></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous">
    </script>
</body