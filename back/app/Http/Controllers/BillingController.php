<?php

namespace App\Http\Controllers;

use App\helpers\ResponseHelper;
use App\Models\Billing;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class BillingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 10;
        $order = $request->get('order') ? $request->get('order') : 'DESC';

        $term = $request->get('term');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $billings = Billing::where(function ($query) use ($term) {
            $query->where('number_bill', 'like', "%$term%");
            $query->orWhere('nit_emitter', 'like', "%$term%");
            $query->orWhere('nit_purchaser', 'like', "%$term%");
        })->orderBy('id', $order)->paginate($limit);

        return response()->json([
            'status' => 'OK',
            'success' => true,
            'billings' => $billings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'number_bill' => 'required|unique:App\Models\Billing,number_bill',
            'full_name_emitter' => 'required|string',
            'nit_emitter' => 'required|numeric',
            'full_name_purchaser' => 'required|string',
            'nit_purchaser' => 'required|numeric',
            'subtotal' => 'required|numeric',
            'iva' => 'required|numeric',
            'total' => 'required|numeric',
            'details' => 'required',
        ]);

        try {

            $billing = new Billing($request->all());
            $billing->save();


            return ResponseHelper::createAndUpdateResponse($billing, 'Factura guardada correctamente');
        } catch (\Throwable $th) {
            ResponseHelper::errorResponse($th, 'Factura no pudo ser guardada');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $billing = Billing::find($id);

        return ResponseHelper::getResponse($billing);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'full_name_emitter' => 'required|string',
            'nit_emitter' => 'required|numeric',
            'full_name_purchaser' => 'required|string',
            'nit_purchaser' => 'required|numeric',
            'subtotal' => 'required|numeric',
            'iva' => 'required|numeric',
            'total' => 'required|numeric',
            'details' => 'required',
        ]);

        try {
            $billing = Billing::find($id);

            if (!$billing) {
                return ResponseHelper::exitsAndNoExitsResponse('No existe la factura solicitada');
            }

            $billing->update([
                'full_name_emitter' => $request->input('full_name_emitter'),
                'nit_emitter' => $request->input('nit_emitter'),
                'full_name_purchaser' => $request->input('full_name_purchaser'),
                'nit_purchaser' => $request->input('nit_purchaser'),
                'subtotal' => $request->input('subtotal'),
                'iva' => $request->input('iva'),
                'total' => $request->input('total'),
                'detail' => $request->input('detail'),
            ]);



            return  ResponseHelper::createAndUpdateResponse($billing, 'Factura actualizada correctamente',);
        } catch (\Throwable $th) {
            ResponseHelper::errorResponse($th, 'La factura no pudo ser actualizado');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $billing = Billing::find($id);

        if (!$billing) {
            return ResponseHelper::exitsAndNoExitsResponse('No existe la factura solicitada');
        }

        $billing->delete();
        return ResponseHelper::deleteResponse('Factura eliminada correctamente');
    }
}
