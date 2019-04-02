// Code generated by protoc-gen-go. DO NOT EDIT.
// source: block.proto

package pb

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type Block struct {
	// Order is preserved in repeated fields
	TransactionHashes    []string `protobuf:"bytes,1,rep,name=transaction_hashes,json=transactionHashes,proto3" json:"transaction_hashes,omitempty"`
	Receipts             []string `protobuf:"bytes,2,rep,name=receipts,proto3" json:"receipts,omitempty"`
	Events               []string `protobuf:"bytes,3,rep,name=events,proto3" json:"events,omitempty"`
	TransactionDb        string   `protobuf:"bytes,4,opt,name=transaction_db,json=transactionDb,proto3" json:"transaction_db,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Block) Reset()         { *m = Block{} }
func (m *Block) String() string { return proto.CompactTextString(m) }
func (*Block) ProtoMessage()    {}
func (*Block) Descriptor() ([]byte, []int) {
	return fileDescriptor_8e550b1f5926e92d, []int{0}
}

func (m *Block) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Block.Unmarshal(m, b)
}
func (m *Block) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Block.Marshal(b, m, deterministic)
}
func (m *Block) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Block.Merge(m, src)
}
func (m *Block) XXX_Size() int {
	return xxx_messageInfo_Block.Size(m)
}
func (m *Block) XXX_DiscardUnknown() {
	xxx_messageInfo_Block.DiscardUnknown(m)
}

var xxx_messageInfo_Block proto.InternalMessageInfo

func (m *Block) GetTransactionHashes() []string {
	if m != nil {
		return m.TransactionHashes
	}
	return nil
}

func (m *Block) GetReceipts() []string {
	if m != nil {
		return m.Receipts
	}
	return nil
}

func (m *Block) GetEvents() []string {
	if m != nil {
		return m.Events
	}
	return nil
}

func (m *Block) GetTransactionDb() string {
	if m != nil {
		return m.TransactionDb
	}
	return ""
}

func init() {
	proto.RegisterType((*Block)(nil), "pb.Block")
}

func init() { proto.RegisterFile("block.proto", fileDescriptor_8e550b1f5926e92d) }

var fileDescriptor_8e550b1f5926e92d = []byte{
	// 143 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x4e, 0xca, 0xc9, 0x4f,
	0xce, 0xd6, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x2a, 0x48, 0x52, 0x9a, 0xc8, 0xc8, 0xc5,
	0xea, 0x04, 0x12, 0x13, 0xd2, 0xe5, 0x12, 0x2a, 0x29, 0x4a, 0xcc, 0x2b, 0x4e, 0x4c, 0x2e, 0xc9,
	0xcc, 0xcf, 0x8b, 0xcf, 0x48, 0x2c, 0xce, 0x48, 0x2d, 0x96, 0x60, 0x54, 0x60, 0xd6, 0xe0, 0x0c,
	0x12, 0x44, 0x92, 0xf1, 0x00, 0x4b, 0x08, 0x49, 0x71, 0x71, 0x14, 0xa5, 0x26, 0xa7, 0x66, 0x16,
	0x94, 0x14, 0x4b, 0x30, 0x81, 0x15, 0xc1, 0xf9, 0x42, 0x62, 0x5c, 0x6c, 0xa9, 0x65, 0xa9, 0x79,
	0x25, 0xc5, 0x12, 0xcc, 0x60, 0x19, 0x28, 0x4f, 0x48, 0x95, 0x8b, 0x0f, 0xd9, 0x8a, 0x94, 0x24,
	0x09, 0x16, 0x05, 0x46, 0x0d, 0xce, 0x20, 0x5e, 0x24, 0x51, 0x97, 0xa4, 0x24, 0x36, 0xb0, 0xf3,
	0x8c, 0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0xf5, 0x3c, 0xd3, 0xb4, 0xad, 0x00, 0x00, 0x00,
}
