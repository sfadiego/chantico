<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {{ env('APP_NAME') }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        .calculate-height {
            height: calc(100vh - 56px) !important;
        }

        .hr {}

        .b-divider {
            width: 100%;
            height: 3rem;
            /* background-color: rgba(0, 0, 0, .1); */
            border: solid rgba(0, 0, 0, .15);
            border-width: 1px 0;
            box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
        }

        .b-vr {
            flex-shrink: 0;
            width: 0.2rem;
        }

        .btn {
            border-radius: 0%;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-sm border-bottom" aria-label="Third navbar example">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                {{ env('APP_NAME') }}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarChantico"
                aria-controls="navbarChantico" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarChantico">
                <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Mesas</a>
                    </li>
                </ul>
                <form class="col-md-3" role="search">
                    <input class="form-control" type="search" placeholder="Buscar productos" aria-label="Search">
                </form>
            </div>
        </div>
    </nav>
    <main class="d-flex flex-nowrap">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
            <a href="/" class="d-flex text-dark text-decoration-none">
                <span class="fs-4">Mesa 1</span>
            </a>
            <hr class="mt2 mb-2">
            <div class="mb-auto">
                <div class="d-flex mb-auto">
                    <div class="p-2 flex-grow-1">Cafe </div>
                    <div class="p-2">1</div>
                    <div class="p-2"> + - </div>
                </div>
                <div class="d-flex mb-auto">
                    <div class="p-2 flex-grow-1">Tizana </div>
                    <div class="p-2">1</div>
                    <div class="p-2"> + - </div>
                </div>

            </div>
            <hr class="mt-2 mb-2">
            <div class="d-flex text-secondary">
                <div class="flex-fill ">
                    <button class="btn btn-info col-12" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                            <path
                                d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                        </svg>
                    </button>
                </div>
                <div class="ps-1 flex-fill">
                    <button class="btn btn-info col-12" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-percent" viewBox="0 0 16 16">
                            <path
                                d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="d-flex text-secondary">
                <div class="p-2 flex-grow-1 ">Subtotal </div>
                <div class="p-2">$ 1100</div>
            </div>
            <div class="d-flex text-secondary">
                <div class="p-2 flex-grow-1 ">Descuento </div>
                <div class="p-2"> 0% </div>
            </div>
            <div class="d-flex">
                <div class="p-2 flex-grow-1">Total </div>
                <div class="p-2">$ 1100</div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-success" type="button">
                    Pagar $1100
                </button>
            </div>
        </div>
        <div class="border-end b-vr calculate-height"></div>
        <div class="container-fluid">
            <div class="row mt-1">
                <div class="col-12">
                    <h3>Categorias</h3>
                </div>
                <div class="col-md-12">
                    <div class="d-flex mb-3 border">
                        <div class="p-2 border">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-list-nested" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5" />
                            </svg>
                            Todos
                        </div>
                        <div class="p-2 ms-1 border">
                            Cafes
                        </div>
                        <div class="p-2 ms-1 border">
                            Tisanas
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-12">
                    <h3>Productos</h3>
                </div>
                <div class="col-md-3">
                    <div class="card rounded-0">
                        <img src="https://media.istockphoto.com/id/1443030673/es/foto/hamburguesa-en-bollo-con-queso-y-guarnici%C3%B3n-de-verduras.webp?s=1024x1024&w=is&k=20&c=3qIz6X2xCgCna_5wWdGWSDdrbr1LdBvpulrbXiPCnpE="
                            class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <p class="card-text text-secondary">Some quick example.</p>
                            <b>
                                $ 120.5
                            </b>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card rounded-0">
                        <img src="https://media.istockphoto.com/id/1443030673/es/foto/hamburguesa-en-bollo-con-queso-y-guarnici%C3%B3n-de-verduras.webp?s=1024x1024&w=is&k=20&c=3qIz6X2xCgCna_5wWdGWSDdrbr1LdBvpulrbXiPCnpE="
                            class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <p class="card-text text-secondary">Some quick example.</p>
                            <b>$120.5</b>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card rounded-0">
                        <img src="https://media.istockphoto.com/id/1443030673/es/foto/hamburguesa-en-bollo-con-queso-y-guarnici%C3%B3n-de-verduras.webp?s=1024x1024&w=is&k=20&c=3qIz6X2xCgCna_5wWdGWSDdrbr1LdBvpulrbXiPCnpE="
                            class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <p class="card-text text-secondary">Some quick example.</p>
                            <b>$120.5</b>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card rounded-0">
                        <img src="https://media.istockphoto.com/id/1443030673/es/foto/hamburguesa-en-bollo-con-queso-y-guarnici%C3%B3n-de-verduras.webp?s=1024x1024&w=is&k=20&c=3qIz6X2xCgCna_5wWdGWSDdrbr1LdBvpulrbXiPCnpE="
                            class="card-img-top rounded-0" alt="...">
                        <div class="card-body">
                            <p class="card-text text-secondary">Some quick example.</p>
                            <b>$120.5</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>
</body>

</html>
